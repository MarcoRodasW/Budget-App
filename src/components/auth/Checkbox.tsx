import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../theme';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  children: ReactNode;
};

export default function Checkbox({ checked, onChange, error, children }: Props) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => onChange(!checked)}
      hitSlop={6}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.box, checked && styles.boxChecked, error && !checked && styles.boxError]}>
        {checked && <Ionicons name="checkmark" size={14} color={colors.ink} />}
      </View>
      <View style={styles.label}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.charcoal,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.mustard,
    borderColor: colors.mustard,
  },
  boxError: {
    borderColor: colors.error,
  },
  label: {
    flex: 1,
  },
});
