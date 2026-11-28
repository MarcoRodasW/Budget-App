import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';
import { AvisoDeshacerProps } from '../../utils/types/GastosProps';

export default function AvisoDeshacer({ descripcion, onDeshacer }: AvisoDeshacerProps) {
  return (
    <View style={styles.aviso} accessibilityLiveRegion="polite">
      <Text style={styles.texto} numberOfLines={2}>
        Se eliminó el gasto: {descripcion}.
      </Text>
      <Pressable onPress={onDeshacer} hitSlop={12} accessibilityRole="button">
        {({ pressed }) => <Text style={[styles.accion, pressed && styles.accionPresionada]}>Deshacer</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  aviso: {
    position: 'absolute',
    left: spacing.margin,
    right: spacing.margin,
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.ink,
    ...elevation.level2,
  },
  texto: {
    ...typography.bodyMd,
    flex: 1,
    color: colors.surface,
  },
  accion: {
    ...typography.labelLg,
    color: colors.mustard,
  },
  accionPresionada: {
    opacity: 0.6,
  },
});
