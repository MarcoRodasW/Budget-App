import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ResumenCard from '../components/gastos/ResumenCard';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography } from '../theme';
import {
  GASTOS_INICIALES,
  PASO_PRESUPUESTO,
  PRESUPUESTO_INICIAL,
  PRESUPUESTO_MAXIMO,
  PRESUPUESTO_MINIMO,
} from '../utils/gastos';
import { Gasto } from '../utils/types/Gasto';

export default function Home() {
  const { user } = useAuth();

  const [gastos] = useState<Gasto[]>(GASTOS_INICIALES);
  const [presupuesto, setPresupuesto] = useState<number>(PRESUPUESTO_INICIAL);

  const disminuirPresupuesto = () => {
    setPresupuesto(anterior => Math.max(PRESUPUESTO_MINIMO, anterior - PASO_PRESUPUESTO));
  };

  const aumentarPresupuesto = () => {
    setPresupuesto(anterior => Math.min(PRESUPUESTO_MAXIMO, anterior + PASO_PRESUPUESTO));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Mis gastos de la semana</Text>
        {user && <Text style={styles.greeting}>Hola, {user.username} 👋</Text>}
        <Text style={styles.subtitle}>{gastos.length} gastos registrados</Text>

        <ResumenCard presupuesto={presupuesto} />

        <View style={styles.presupuestoBotones}>
          <View style={styles.presupuestoBoton}>
            <CustomButton
              title="−100"
              size="sm"
              variant="secondary"
              onPress={disminuirPresupuesto}
              disabled={presupuesto <= PRESUPUESTO_MINIMO}
            />
          </View>
          <View style={styles.presupuestoBoton}>
            <CustomButton
              title="+100"
              size="sm"
              variant="secondary"
              onPress={aumentarPresupuesto}
              disabled={presupuesto >= PRESUPUESTO_MAXIMO}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 3,
    gap: spacing.md,
  },
  title: {
    ...typography.headlineLg,
  },
  greeting: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginTop: -spacing.sm,
  },
  subtitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginTop: -spacing.sm,
  },
  presupuestoBotones: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  presupuestoBoton: {
    flex: 1,
  },
});
