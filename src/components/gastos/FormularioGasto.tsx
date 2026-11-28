import { StyleSheet, Text, View } from 'react-native';
import { colors, elevation, radii, spacing, typography } from '../../theme';
import { OPCIONES_CATEGORIA } from '../../utils/gastos';
import { FormularioGastoProps } from '../../utils/types/GastosProps';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import ChipGroup from './ChipGroup';

export default function FormularioGasto({
  descripcion,
  monto,
  categoria,
  errorDescripcion,
  errorMonto,
  deshabilitado,
  onCambiarDescripcion,
  onCambiarMonto,
  onCambiarCategoria,
  onAgregar,
}: FormularioGastoProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Nuevo gasto</Text>

      <CustomInput
        label="Descripción"
        placeholder="Ej. Almuerzo en cafetería"
        icon="create-outline"
        value={descripcion}
        onChangeText={onCambiarDescripcion}
        error={errorDescripcion ?? undefined}
        returnKeyType="next"
      />

      <CustomInput
        label="Monto (L)"
        placeholder="0.00"
        icon="cash-outline"
        keyboardType="decimal-pad"
        value={monto}
        onChangeText={onCambiarMonto}
        error={errorMonto ?? undefined}
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categorias}>
        <ChipGroup opciones={OPCIONES_CATEGORIA} seleccionado={categoria} onSeleccionar={onCambiarCategoria} />
      </View>

      <CustomButton title="Agregar gasto" onPress={onAgregar} disabled={deshabilitado} />
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
  titulo: {
    ...typography.headlineSm,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelLg,
    marginBottom: spacing.sm,
  },
  categorias: {
    marginBottom: spacing.lg,
  },
});
