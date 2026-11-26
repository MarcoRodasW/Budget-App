import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, elevation, spacing, typography } from '../../theme';

type Props = {
  title: string;
  subtitle: string;
  onBack?: () => void;
  footer?: ReactNode;
  children: ReactNode;
};


export default function AuthLayout({ title, subtitle, onBack, footer, children }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {onBack && (
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Volver"
            >
              <Ionicons name="arrow-back" size={22} color={colors.ink} />
            </Pressable>
          )}

          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.body}>{children}</View>

          {footer && <View style={styles.footer}>{footer}</View>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairline,
    ...elevation.level1,
  },
  backPressed: {
    transform: [{ scale: 0.94 }],
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: 40,
  },
  title: {
    ...typography.displayMobile,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 220,
  },
  body: {
    alignSelf: 'stretch',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
});
