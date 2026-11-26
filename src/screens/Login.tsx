import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AuthFooterLink from '../components/auth/AuthFooterLink';
import AuthLayout from '../components/auth/AuthLayout';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/StackNavigator';
import { colors, fonts, spacing } from '../theme';
import { EMAIL_REGEX } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

type Errors = { email?: string; password?: string };

export default function Login({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleLogin = () => {
    const trimmed = email.trim();
    const next: Errors = {};
    if (!EMAIL_REGEX.test(trimmed)) next.email = 'Ingresa un correo válido';
    if (!password) next.password = 'Ingresa tu contraseña';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    signIn(trimmed);
  };

  return (
    <AuthLayout
      title="¡Bienvenido de nuevo!"
      subtitle="La mejor forma de gestionar tus finanzas."
      onBack={() => navigation.goBack()}
      footer={
        <AuthFooterLink
          question="¿No tienes una cuenta?"
          action="Regístrate"
          onPress={() => navigation.replace('RegisterScreen')}
        />
      }
    >
      <CustomInput
        label="Correo electrónico"
        icon="mail-outline"
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (errors.email) setErrors(e => ({ ...e, email: undefined }));
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
      />
      <CustomInput
        label="Contraseña"
        icon="lock-closed-outline"
        placeholder="Ingresa tu contraseña"
        password
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (errors.password) setErrors(e => ({ ...e, password: undefined }));
        }}
        error={errors.password}
        autoCapitalize="none"
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />

      <View style={styles.forgotRow}>
        <Text
          style={styles.forgot}
          onPress={() => Alert.alert('Próximamente', 'La recuperación de contraseña estará disponible pronto.')}
          accessibilityRole="link"
          suppressHighlighting
        >
          ¿Olvidaste tu contraseña?
        </Text>
      </View>

      <CustomButton title="Iniciar sesión" onPress={handleLogin} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.xl,
  },
  forgot: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.primary,
  },
});
