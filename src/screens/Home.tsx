import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import AvisoDeshacer from '../components/gastos/AvisoDeshacer';
import ChipGroup from '../components/gastos/ChipGroup';
import FormularioGasto from '../components/gastos/FormularioGasto';
import GastoItem from '../components/gastos/GastoItem';
import ResumenCard from '../components/gastos/ResumenCard';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';
import {
  CATEGORIAS,
  ETIQUETAS_CATEGORIA,
  FILTROS,
  GASTOS_INICIALES,
  PASO_PRESUPUESTO,
  PRESUPUESTO_INICIAL,
  PRESUPUESTO_MAXIMO,
  PRESUPUESTO_MINIMO,
  SIGUIENTE_ID_INICIAL,
  normalizarMonto,
  sumarMontos,
} from '../utils/gastos';
import { Categoria, FiltroCategoria, Gasto, GastoEliminado, NivelPresupuesto, TotalCategoria } from '../utils/types/Gasto';

export default function Home() {
  const { user } = useAuth();

  const [gastos, setGastos] = useState<Gasto[] | null>(null);
  const [presupuesto, setPresupuesto] = useState<number>(PRESUPUESTO_INICIAL);
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>('todas');
  const [soloPendientes, setSoloPendientes] = useState<boolean>(false);
  const [gastoEliminado, setGastoEliminado] = useState<GastoEliminado | null>(null);
  const [siguienteId, setSiguienteId] = useState<number>(SIGUIENTE_ID_INICIAL);
  const [descripcion, setDescripcion] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const [categoriaNueva, setCategoriaNueva] = useState<Categoria>('comida');
  const [descripcionTocada, setDescripcionTocada] = useState<boolean>(false);
  const [montoTocado, setMontoTocado] = useState<boolean>(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setGastos(GASTOS_INICIALES), 1500);
    return () => clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    if (gastoEliminado === null) return;
    const temporizador = setTimeout(() => setGastoEliminado(null), 5000);
    return () => clearTimeout(temporizador);
  }, [gastoEliminado]);

  const gastosVisibles = useMemo(
    () =>
      (gastos ?? []).filter(
        gasto =>
          (filtroCategoria === 'todas' || gasto.categoria === filtroCategoria) &&
          (!soloPendientes || !gasto.pagado),
      ),
    [gastos, filtroCategoria, soloPendientes],
  );

  const totalGastado = useMemo(() => sumarMontos(gastos ?? []), [gastos]);

  const totalPendiente = useMemo(() => sumarMontos((gastos ?? []).filter(gasto => !gasto.pagado)), [gastos]);

  const totalVisible = useMemo(() => sumarMontos(gastosVisibles), [gastosVisibles]);

  const porcentajeUsado = useMemo(() => (totalGastado / presupuesto) * 100, [totalGastado, presupuesto]);

  const nivelPresupuesto = useMemo<NivelPresupuesto>(() => {
    if (porcentajeUsado < 70) return 'normal';
    if (porcentajeUsado <= 100) return 'alerta';
    return 'excedido';
  }, [porcentajeUsado]);

  const excedente = useMemo(() => Math.max(0, totalGastado - presupuesto), [totalGastado, presupuesto]);

  const totalesPorCategoria = useMemo<TotalCategoria[]>(
    () =>
      CATEGORIAS.map(categoria => ({
        categoria,
        total: sumarMontos((gastos ?? []).filter(gasto => gasto.categoria === categoria)),
      })),
    [gastos],
  );

  const categoriaMayor = useMemo(
    () =>
      totalesPorCategoria.reduce<TotalCategoria | null>(
        (mayor, actual) => (actual.total > 0 && (mayor === null || actual.total > mayor.total) ? actual : mayor),
        null,
      ),
    [totalesPorCategoria],
  );

  const mensajeVacio = useMemo(() => {
    const categoria = filtroCategoria === 'todas' ? '' : ` de ${ETIQUETAS_CATEGORIA[filtroCategoria].toLowerCase()}`;
    const estado = soloPendientes ? ' pendientes' : '';
    return `No hay gastos${categoria}${estado}`;
  }, [filtroCategoria, soloPendientes]);

  const errorDescripcion = useMemo(() => {
    const texto = descripcion.trim();
    if (texto.length < 3) return 'La descripción debe tener al menos 3 caracteres';
    const repetido = (gastos ?? []).some(
      gasto => gasto.categoria === categoriaNueva && gasto.descripcion.trim().toLowerCase() === texto.toLowerCase(),
    );
    if (repetido) return `Ya existe «${texto}» en ${ETIQUETAS_CATEGORIA[categoriaNueva].toLowerCase()}`;
    return null;
  }, [descripcion, categoriaNueva, gastos]);

  const errorMonto = useMemo(() => {
    const texto = normalizarMonto(monto);
    if (texto === '') return 'Ingrese un monto';
    if (!/^-?(\d+(\.\d*)?|\.\d+)$/.test(texto)) return 'El monto debe ser un número';
    if (/\.\d{3,}$/.test(texto)) return 'El monto admite máximo dos decimales';
    if (Number(texto) <= 0) return 'El monto debe ser mayor que 0';
    return null;
  }, [monto]);

  const formularioInvalido = errorDescripcion !== null || errorMonto !== null;

  const cambiarDescripcion = (texto: string) => {
    setDescripcion(texto);
    setDescripcionTocada(true);
  };

  const cambiarMonto = (texto: string) => {
    setMonto(texto);
    setMontoTocado(true);
  };

  const agregarGasto = () => {
    if (formularioInvalido) return;
    const nuevoGasto: Gasto = {
      id: siguienteId,
      descripcion: descripcion.trim(),
      categoria: categoriaNueva,
      monto: Number(normalizarMonto(monto)),
      pagado: false,
    };
    setGastos(anteriores => (anteriores === null ? null : [nuevoGasto, ...anteriores]));
    setSiguienteId(anterior => anterior + 1);
    if (filtroCategoria !== 'todas' && filtroCategoria !== nuevoGasto.categoria) {
      setFiltroCategoria('todas');
    }
    setDescripcion('');
    setMonto('');
    setCategoriaNueva('comida');
    setDescripcionTocada(false);
    setMontoTocado(false);
  };

  const eliminarGasto = (id: number) => {
    if (gastos === null) return;
    const indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice === -1) return;
    setGastoEliminado({ gasto: gastos[indice], indice });
    setGastos(anteriores => (anteriores === null ? null : anteriores.filter(gasto => gasto.id !== id)));
  };

  const deshacerEliminacion = () => {
    if (gastoEliminado === null) return;
    const { gasto, indice } = gastoEliminado;
    setGastos(anteriores =>
      anteriores === null ? null : [...anteriores.slice(0, indice), gasto, ...anteriores.slice(indice)],
    );
    setGastoEliminado(null);
  };

  const alternarPagado = (id: number) => {
    setGastos(anteriores =>
      anteriores === null
        ? null
        : anteriores.map(gasto => (gasto.id === id ? { ...gasto, pagado: !gasto.pagado } : gasto)),
    );
  };

  const disminuirPresupuesto = () => {
    setPresupuesto(anterior => Math.max(PRESUPUESTO_MINIMO, anterior - PASO_PRESUPUESTO));
  };

  const aumentarPresupuesto = () => {
    setPresupuesto(anterior => Math.min(PRESUPUESTO_MAXIMO, anterior + PASO_PRESUPUESTO));
  };

  if (gastos === null) {
    return (
      <View style={[styles.container, styles.cargando]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.cargandoTexto}>Cargando gastos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Mis gastos de la semana</Text>
        {user && <Text style={styles.greeting}>Hola, {user.username} 👋</Text>}
        <Text style={styles.subtitle}>{gastos.length} gastos registrados</Text>

        <ResumenCard
          presupuesto={presupuesto}
          totalGastado={totalGastado}
          totalPendiente={totalPendiente}
          totalVisible={totalVisible}
          porcentajeUsado={porcentajeUsado}
          nivelPresupuesto={nivelPresupuesto}
          excedente={excedente}
          categoriaMayor={categoriaMayor}
        />

        <View style={styles.presupuestoBotones}>
          <View style={styles.presupuestoBoton}>
            <CustomButton
              title="−100"
              size="sm"
              variant="secondary"
              onPress={disminuirPresupuesto}
              disabled={presupuesto <= PRESUPUESTO_MINIMO}
            />
          </View>
          <View style={styles.presupuestoBoton}>
            <CustomButton
              title="+100"
              size="sm"
              variant="secondary"
              onPress={aumentarPresupuesto}
              disabled={presupuesto >= PRESUPUESTO_MAXIMO}
            />
          </View>
        </View>

        <FormularioGasto
          descripcion={descripcion}
          monto={monto}
          categoria={categoriaNueva}
          errorDescripcion={descripcionTocada ? errorDescripcion : null}
          errorMonto={montoTocado ? errorMonto : null}
          deshabilitado={formularioInvalido}
          onCambiarDescripcion={cambiarDescripcion}
          onCambiarMonto={cambiarMonto}
          onCambiarCategoria={setCategoriaNueva}
          onAgregar={agregarGasto}
        />

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Lista de gastos</Text>
        </View>

        <ChipGroup opciones={FILTROS} seleccionado={filtroCategoria} onSeleccionar={setFiltroCategoria} />

        <View style={styles.switchFila}>
          <Text style={styles.switchTexto}>Solo pendientes</Text>
          <Switch
            value={soloPendientes}
            onValueChange={setSoloPendientes}
            trackColor={{ false: colors.muted, true: colors.mustard }}
            thumbColor={colors.surface}
            accessibilityLabel="Solo pendientes"
          />
        </View>

        <View style={styles.lista}>
          {gastosVisibles.length === 0 ? (
            <Text style={styles.vacio}>{mensajeVacio}</Text>
          ) : (
            gastosVisibles.map((gasto, indice) => (
              <GastoItem
                key={gasto.id}
                gasto={gasto}
                posicion={indice + 1}
                onAlternarPagado={alternarPagado}
                onEliminar={eliminarGasto}
              />
            ))
          )}
        </View>
      </ScrollView>

      {gastoEliminado && (
        <AvisoDeshacer descripcion={gastoEliminado.gasto.descripcion} onDeshacer={deshacerEliminacion} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  cargando: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  cargandoTexto: {
    ...typography.bodyLg,
    color: colors.charcoal,
  },
  content: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 3,
    gap: spacing.md,
  },
  title: {
    ...typography.headlineLg,
  },
  greeting: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginTop: -spacing.sm,
  },
  subtitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginTop: -spacing.sm,
  },
  presupuestoBotones: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  presupuestoBoton: {
    flex: 1,
  },
  seccion: {
    marginTop: spacing.sm,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  seccionTitulo: {
    ...typography.headlineMd,
  },
  switchFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchTexto: {
    ...typography.titleMd,
  },
  lista: {
    gap: spacing.gutter,
  },
  vacio: {
    ...typography.bodyLg,
    color: colors.charcoal,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
