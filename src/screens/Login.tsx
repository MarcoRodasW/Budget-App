import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();

  const handleLogin = () => {
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Ingresa un email válido');
      return;
    }
    setError(undefined);
    navigation.navigate('MainTabs', { screen: 'Home', params: { email: trimmed } });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <CustomInput
        label="Email"
        placeholder="tucorreo@ejemplo.com"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (error) setError(undefined);
        }}
        error={error}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />
      <CustomButton title="Entrar" onPress={handleLogin} disabled={!email.trim()} />
      <CustomButton title="¿No tienes cuenta? Regístrate" variant="tertiary" onPress={() => navigation.navigate('RegisterScreen')} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
});
