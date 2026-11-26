import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import WelcomeIllustration from '../components/WelcomeIllustration';
import { RootStackParamList } from '../navigation/StackNavigator';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>;

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Comencemos!</Text>
        <Text style={styles.subtitle}>La mejor forma de gestionar tus finanzas.</Text>
      </View>

      <View style={styles.illustration}>
        <WelcomeIllustration />
      </View>

      <View style={styles.actions}>
        <CustomButton title="Crear cuenta" onPress={() => navigation.navigate('RegisterScreen')} />
        <CustomButton title="Iniciar sesión" variant="secondary" onPress={() => navigation.navigate('LoginScreen')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.canvas,
    paddingHorizontal: spacing.margin,
  },
  header: {
    alignItems: 'center',
    marginTop: 56,
  },
  title: {
    ...typography.displayLg,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 220,
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    gap: spacing.gutter,
    paddingBottom: spacing.lg,
  },
});
