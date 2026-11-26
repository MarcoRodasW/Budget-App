import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import { colors } from '../theme';
import TabsNavigator, { TabsParamList } from './StackTabsNavigation';

// Screens and the params each one receives
export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainTabs: NavigatorScreenParams<TabsParamList> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}>
      {user ? (
        <Stack.Screen name="MainTabs" component={TabsNavigator} />
      ) : (
        <Stack.Group screenOptions={{ animationTypeForReplace: 'pop' }}>
          <Stack.Screen name="WelcomeScreen" component={Welcome} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="RegisterScreen" component={Register} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
