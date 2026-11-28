import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { ChipGroupProps } from '../../utils/types/GastosProps';

export default function ChipGroup<T extends string>({ opciones, seleccionado, onSeleccionar }: ChipGroupProps<T>) {
  return (
    <View style={styles.grupo}>
      {opciones.map(opcion => {
        const activo = opcion.valor === seleccionado;
        return (
          <Pressable
            key={opcion.valor}
            onPress={() => onSeleccionar(opcion.valor)}
            style={({ pressed }) => [styles.chip, activo && styles.chipActivo, pressed && styles.chipPresionado]}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
          >
            <Text style={[styles.texto, activo && styles.textoActivo]}>{opcion.etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.hairline,
  },
  chipActivo: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  chipPresionado: {
    opacity: 0.7,
  },
  texto: {
    ...typography.labelLg,
  },
  textoActivo: {
    color: colors.surface,
  },
});
