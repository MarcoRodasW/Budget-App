import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ChipGroup from '../components/gastos/ChipGroup';
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
  sumarMontos,
} from '../utils/gastos';
import { FiltroCategoria, Gasto, NivelPresupuesto, TotalCategoria } from '../utils/types/Gasto';

export default function Home() {
  const { user } = useAuth();

  const [gastos, setGastos] = useState<Gasto[]>(GASTOS_INICIALES);
  const [presupuesto, setPresupuesto] = useState<number>(PRESUPUESTO_INICIAL);
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>('todas');
  const [soloPendientes, setSoloPendientes] = useState<boolean>(false);

  const gastosVisibles = useMemo(
    () =>
      gastos.filter(
        gasto =>
          (filtroCategoria === 'todas' || gasto.categoria === filtroCategoria) &&
          (!soloPendientes || !gasto.pagado),
      ),
    [gastos, filtroCategoria, soloPendientes],
  );

  const totalGastado = useMemo(() => sumarMontos(gastos), [gastos]);

  const totalPendiente = useMemo(() => sumarMontos(gastos.filter(gasto => !gasto.pagado)), [gastos]);

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
        total: sumarMontos(gastos.filter(gasto => gasto.categoria === categoria)),
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

  const eliminarGasto = (id: number) => {
    setGastos(anteriores => anteriores.filter(gasto => gasto.id !== id));
  };

  const alternarPagado = (id: number) => {
    setGastos(anteriores =>
      anteriores.map(gasto => (gasto.id === id ? { ...gasto, pagado: !gasto.pagado } : gasto)),
    );
  };

  const disminuirPresupuesto = () => {
    setPresupuesto(anterior => Math.max(PRESUPUESTO_MINIMO, anterior - PASO_PRESUPUESTO));
  };

  const aumentarPresupuesto = () => {
    setPresupuesto(anterior => Math.min(PRESUPUESTO_MAXIMO, anterior + PASO_PRESUPUESTO));
  };

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
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
