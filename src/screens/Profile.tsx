import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../theme";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Perfil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.canvas,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...typography.headlineLg,
    },
});
