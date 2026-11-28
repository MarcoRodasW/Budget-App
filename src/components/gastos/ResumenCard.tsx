import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';
import { ETIQUETAS_CATEGORIA, formatearMonto } from '../../utils/gastos';
import { ResumenCardProps } from '../../utils/types/GastosProps';

export default function ResumenCard({
  presupuesto,
  totalGastado,
  totalPendiente,
  totalVisible,
  porcentajeUsado,
  nivelPresupuesto,
  excedente,
  categoriaMayor,
}: ResumenCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.encabezado}>
        <Text style={styles.label}>Presupuesto semanal</Text>
        <Text style={styles.presupuesto}>{formatearMonto(presupuesto)}</Text>
      </View>

      <View>
        <Text style={styles.label}>Total gastado</Text>
        <Text style={styles.totalGastado}>{formatearMonto(totalGastado)}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.dato}>
          <Text style={styles.label}>Pendiente de pago</Text>
          <Text style={styles.valor}>{formatearMonto(totalPendiente)}</Text>
        </View>
        <View style={styles.dato}>
          <Text style={styles.label}>Total visible</Text>
          <Text style={styles.valor}>{formatearMonto(totalVisible)}</Text>
        </View>
      </View>

      <View style={styles.progreso}>
        <Text style={styles.porcentaje}>{porcentajeUsado.toFixed(1)} % del presupuesto usado</Text>
        <View style={styles.pista}>
          <View style={[styles.barra, styles[nivelPresupuesto], { width: `${Math.min(porcentajeUsado, 100)}%` }]} />
        </View>
        {excedente > 0 && (
          <Text style={styles.excedente}>Excedió el presupuesto por {formatearMonto(excedente)}</Text>
        )}
      </View>

      <View style={styles.mayor}>
        <Text style={styles.label}>Categoría con mayor gasto</Text>
        <Text style={styles.valor}>
          {categoriaMayor
            ? `${ETIQUETAS_CATEGORIA[categoriaMayor.categoria]} · ${formatearMonto(categoriaMayor.total)}`
            : 'Sin gastos registrados'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...elevation.level1,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  presupuesto: {
    ...typography.titleMd,
  },
  totalGastado: {
    ...typography.displayMobile,
    marginTop: spacing.xs,
  },
  fila: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  dato: {
    flex: 1,
    backgroundColor: colors.canvas,
    borderRadius: radii.sm,
    padding: spacing.sm,
  },
  valor: {
    ...typography.titleMd,
    marginTop: 2,
  },
  progreso: {
    gap: spacing.sm,
  },
  porcentaje: {
    ...typography.labelLg,
  },
  pista: {
    height: 10,
    borderRadius: radii.full,
    backgroundColor: colors.muted,
    overflow: 'hidden',
  },
  barra: {
    height: '100%',
    borderRadius: radii.full,
  },
  normal: {
    backgroundColor: colors.sage,
  },
  alerta: {
    backgroundColor: colors.mustard,
  },
  excedido: {
    backgroundColor: colors.error,
  },
  excedente: {
    ...typography.labelLg,
    color: colors.error,
  },
  mayor: {
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: spacing.md,
  },
});
