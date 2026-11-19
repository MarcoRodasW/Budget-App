import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function Home({ navigation, route }: Props) {
  const email = route.params?.email;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      {email && <Text style={styles.email}>Bienvenido, {email}</Text>}
      {!email && <CustomButton title="Ir a Login" variant="secondary" onPress={() => navigation.navigate('LoginScreen')} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    color: '#24327b',
    marginTop: 8,
  },
});
