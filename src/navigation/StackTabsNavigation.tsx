import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import { colors, fonts } from '../theme';

export type TabsParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: colors.canvas },
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink },
                sceneStyle: { backgroundColor: colors.canvas },
                tabBarActiveTintColor: colors.ink,
                tabBarInactiveTintColor: colors.charcoal,
                tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 11 },
                tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.hairline },
            }}
        >
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />,
                }}
            />
        </Tabs.Navigator>
    );
}
