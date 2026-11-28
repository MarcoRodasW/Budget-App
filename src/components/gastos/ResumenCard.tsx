import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';
import { formatearMonto } from '../../utils/gastos';
import { ResumenCardProps } from '../../utils/types/GastosProps';

export default function ResumenCard({ presupuesto }: ResumenCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Presupuesto semanal</Text>
      <Text style={styles.presupuesto}>{formatearMonto(presupuesto)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...elevation.level1,
  },
  label: {
    ...typography.labelLg,
    color: colors.charcoal,
  },
  presupuesto: {
    ...typography.displayMobile,
    marginTop: spacing.xs,
  },
});
