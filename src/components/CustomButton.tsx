import { Pressable, StyleSheet, Text } from 'react-native';
import { useBubbles } from '../hooks/useBubbles';
import { CustomButtonProps, CustomButtonVariant } from '../utils/types/ButtonProps';

export default function CustomButton({ title, onPress, variant = 'primary', disabled = false }: CustomButtonProps) {
  const { bubbles, addBubble } = useBubbles();
  const styles = getStyles(variant);

  return (
    <Pressable
      style={({ pressed }) => [styles.button, (pressed || disabled) && { opacity: disabled ? 0.5 : 0.9 }]}
      pointerEvents="box-only"
      onPressIn={addBubble}
      onPress={onPress}
      disabled={disabled}
    >
      {bubbles}
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const getStyles = (variant: CustomButtonVariant) =>
  StyleSheet.create({
    button: {
      backgroundColor:
        variant === 'primary' ? '#24327b' : variant === 'secondary' ? 'lightgray' : 'transparent',
      width: 180,
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      overflow: 'hidden',
    },
    buttonText: {
      color: variant === 'primary' ? 'white' : '#000000',
      fontWeight: '500',
      fontSize: variant === 'tertiary' ? 11 : 15,
      letterSpacing: 0.3,
    },
  });
