import { Pressable, StyleSheet, Text } from 'react-native';
import { useBubbles } from '../hooks/useBubbles';
import { colors, fonts, radii } from '../theme';
import { CustomButtonProps } from '../utils/types/ButtonProps';

export default function CustomButton({ title, onPress, variant = 'primary', size = 'md', disabled = false }: CustomButtonProps) {
  const textoClaro = variant === 'primary' || variant === 'danger';
  const { bubbles, addBubble } = useBubbles(textoClaro ? colors.surface : colors.ink);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        size === 'sm' && styles.small,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      pointerEvents="box-only"
      onPressIn={addBubble}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {bubbles}
      <Text style={[styles.label, size === 'sm' && styles.labelSmall, textoClaro && styles.labelPrimary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    height: 52,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: colors.ink,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.error,
  },
  small: {
    height: 40,
    paddingHorizontal: 14,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 15,
    letterSpacing: 0.15,
    color: colors.ink,
  },
  labelSmall: {
    fontSize: 13,
  },
  labelPrimary: {
    color: colors.surface,
  },
});
