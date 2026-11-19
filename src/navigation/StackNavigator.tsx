import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Home from '../screens/Home';

// Screens and the params each one receives
export type RootStackParamList = {
  RegisterScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen name="RegisterScreen" component={Register} options={{ title: 'Register' }} />
      <Stack.Screen name="HomeScreen" component={Home} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}
