import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

export type TabsParamList = {
    Home: { email?: string } | undefined;
    Profile: undefined;
    Settings: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator initialRouteName="Home">
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
                }}
            />
        </Tabs.Navigator>
    );
}
