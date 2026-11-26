import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { colors, spacing, typography } from "../theme";

export default function Settings() {
    const { signOut } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Ajustes</Text>
            <View style={styles.actions}>
                <CustomButton title="Cerrar sesión" variant="secondary" onPress={signOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.canvas,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.margin,
    },
    title: {
        ...typography.headlineLg,
    },
    actions: {
        alignSelf: 'stretch',
        marginTop: spacing.xl,
    },
});
