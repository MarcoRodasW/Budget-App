import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts, radii, spacing, typography } from '../theme';
import { CustomInputProps } from '../utils/types/InputProps';

export default function CustomInput({
  label,
  error,
  required,
  icon,
  password,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const iconColor = error ? colors.error : focused ? colors.ink : colors.charcoal;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View style={[styles.field, focused && styles.fieldFocused, !!error && styles.fieldError]}>
        {icon && <Ionicons name={icon} size={20} color={iconColor} />}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.charcoal}
          secureTextEntry={password && hidden}
          accessibilityLabel={label}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...inputProps}
        />
        {password && (
          <Pressable
            onPress={() => setHidden(h => !h)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}
          >
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.charcoal} />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.labelLg,
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.primary,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.hairline,
  },
  fieldFocused: {
    borderColor: colors.mustard,
  },
  fieldError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.ink,
  },
  errorText: {
    ...typography.labelMd,
    color: colors.error,
    marginTop: 6,
    marginLeft: 4,
  },
});
