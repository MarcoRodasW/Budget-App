import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabsNavigator, { TabsParamList } from './StackTabsNavigation';

// Screens and the params each one receives
export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainTabs: NavigatorScreenParams<TabsParamList> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="RegisterScreen" component={Register} options={{ title: 'Register' }} />
      <Stack.Screen name="MainTabs" component={TabsNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
