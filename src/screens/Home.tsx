import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function Home() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      {user && <Text style={styles.greeting}>Hola, {user.username} 👋</Text>}
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
  greeting: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginTop: spacing.sm,
  },
});
