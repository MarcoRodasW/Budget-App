import { StyleSheet, Text, View } from "react-native";

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
