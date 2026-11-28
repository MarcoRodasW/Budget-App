import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';
import { COLORES_CATEGORIA, ETIQUETAS_CATEGORIA, formatearMonto } from '../../utils/gastos';
import { GastoItemProps } from '../../utils/types/GastosProps';
import CustomButton from '../CustomButton';

export default function GastoItem({ gasto, posicion, onAlternarPagado, onEliminar }: GastoItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.fila}>
        <View style={styles.posicion}>
          <Text style={styles.posicionTexto}>{posicion}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.descripcion}>{gasto.descripcion}</Text>
          <View style={styles.etiquetas}>
            <View style={[styles.badge, { backgroundColor: COLORES_CATEGORIA[gasto.categoria] }]}>
              <Text style={styles.badgeTexto}>{ETIQUETAS_CATEGORIA[gasto.categoria]}</Text>
            </View>
            <View style={[styles.badge, gasto.pagado ? styles.pagado : styles.pendiente]}>
              <Text style={[styles.badgeTexto, gasto.pagado ? styles.pagadoTexto : styles.pendienteTexto]}>
                {gasto.pagado ? 'Pagado' : 'Pendiente'}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.monto}>{formatearMonto(gasto.monto)}</Text>
      </View>

      <View style={styles.acciones}>
        <CustomButton
          title={gasto.pagado ? 'Marcar como pendiente' : 'Marcar como pagado'}
          size="sm"
          variant="secondary"
          onPress={() => onAlternarPagado(gasto.id)}
        //disabled={gasto.pagado}
        />
        <CustomButton title="Eliminar" size="sm" variant="danger" onPress={() => onEliminar(gasto.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.md,
    ...elevation.level1,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.gutter,
  },
  posicion: {
    width: 28,
    height: 28,
    borderRadius: radii.full,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posicionTexto: {
    ...typography.labelLg,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  descripcion: {
    ...typography.titleMd,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.full,
  },
  badgeTexto: {
    ...typography.labelSm,
  },
  pagado: {
    backgroundColor: colors.sage,
  },
  pagadoTexto: {
    color: colors.surface,
  },
  pendiente: {
    backgroundColor: colors.errorContainer,
  },
  pendienteTexto: {
    color: colors.error,
  },
  monto: {
    ...typography.titleMd,
  },
  acciones: {
    gap: spacing.xs,
  },
});
