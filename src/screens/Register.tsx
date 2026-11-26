import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AuthFooterLink from '../components/auth/AuthFooterLink';
import AuthLayout from '../components/auth/AuthLayout';
import Checkbox from '../components/auth/Checkbox';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/StackNavigator';
import { colors, fonts, spacing, typography } from '../theme';
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH, USERNAME_REGEX } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

type Field = 'username' | 'email' | 'password' | 'terms';
type Errors = Partial<Record<Field, string>>;

export default function Register({ navigation }: Props) {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: Field) => {
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleRegister = () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const next: Errors = {};
    if (!USERNAME_REGEX.test(trimmedUsername)) {
      next.username = 'De 3 a 20 caracteres: letras, números, punto o guion bajo';
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) next.email = 'Ingresa un correo válido';
    if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }
    if (!acceptedTerms) next.terms = 'Debes aceptar los Términos y Condiciones';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    signUp({ username: trimmedUsername, email: trimmedEmail });
  };

  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="La mejor forma de gestionar tus finanzas."
      onBack={() => navigation.goBack()}
      footer={
        <AuthFooterLink
          question="¿Ya tienes una cuenta?"
          action="Inicia sesión"
          onPress={() => navigation.replace('LoginScreen')}
        />
      }
    >
      <CustomInput
        label="Nombre de usuario"
        required
        icon="person-outline"
        placeholder="Ingresa tu nombre de usuario"
        value={username}
        onChangeText={text => {
          setUsername(text);
          clearError('username');
        }}
        error={errors.username}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
        textContentType="username"
        returnKeyType="next"
      />
      <CustomInput
        label="Correo electrónico"
        required
        icon="mail-outline"
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={text => {
          setEmail(text);
          clearError('email');
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
        required
        icon="lock-closed-outline"
        placeholder="Ingresa tu contraseña"
        password
        value={password}
        onChangeText={text => {
          setPassword(text);
          clearError('password');
        }}
        error={errors.password}
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
      />

      <View style={styles.terms}>
        <Checkbox
          checked={acceptedTerms}
          error={!!errors.terms}
          onChange={checked => {
            setAcceptedTerms(checked);
            clearError('terms');
          }}
        >
          <Text style={styles.termsText}>
            Acepto los{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Alert.alert('Términos y Condiciones', 'Pronto podrás leer los términos completos aquí.')}
              accessibilityRole="link"
              suppressHighlighting
            >
              Términos y Condiciones
            </Text>
          </Text>
        </Checkbox>
        {!!errors.terms && <Text style={styles.termsError}>{errors.terms}</Text>}
      </View>

      <CustomButton title="Crear cuenta" onPress={handleRegister} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  terms: {
    marginTop: -spacing.xs,
    marginBottom: spacing.xl,
  },
  termsText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  termsLink: {
    fontFamily: fonts.semibold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  termsError: {
    ...typography.labelMd,
    color: colors.error,
    marginTop: 6,
    marginLeft: 4,
  },
});
