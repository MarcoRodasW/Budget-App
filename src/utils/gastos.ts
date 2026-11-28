import { colors } from '../theme';
import { Categoria, FiltroCategoria, Gasto } from './types/Gasto';
import { OpcionChip } from './types/GastosProps';

export const GASTOS_INICIALES: Gasto[] = [
  { id: 1, descripcion: 'Almuerzo en cafetería', categoria: 'comida', monto: 120, pagado: true },
  { id: 2, descripcion: 'Bus de la semana', categoria: 'transporte', monto: 150, pagado: true },
  { id: 3, descripcion: 'Impresión de proyecto', categoria: 'estudio', monto: 85, pagado: false },
  { id: 4, descripcion: 'Cine con amigos', categoria: 'ocio', monto: 180, pagado: false },
  { id: 5, descripcion: 'Libro de cálculo', categoria: 'estudio', monto: 450, pagado: false },
  { id: 6, descripcion: 'Taxi de regreso', categoria: 'transporte', monto: 90, pagado: true },
  { id: 7, descripcion: 'Cena', categoria: 'comida', monto: 140, pagado: false },
  { id: 8, descripcion: 'Suscripción de música', categoria: 'ocio', monto: 99, pagado: true },
];

export const CATEGORIAS: Categoria[] = ['comida', 'transporte', 'ocio', 'estudio'];

export const ETIQUETAS_CATEGORIA: Record<Categoria, string> = {
  comida: 'Comida',
  transporte: 'Transporte',
  ocio: 'Ocio',
  estudio: 'Estudio',
};

export const COLORES_CATEGORIA: Record<Categoria, string> = {
  comida: colors.mustardSoft,
  transporte: colors.sageLight,
  ocio: colors.coralLight,
  estudio: colors.outline,
};

export const FILTROS: OpcionChip<FiltroCategoria>[] = [
  { valor: 'todas', etiqueta: 'Todas' },
  ...CATEGORIAS.map(categoria => ({ valor: categoria, etiqueta: ETIQUETAS_CATEGORIA[categoria] })),
];

export const PRESUPUESTO_INICIAL = 1500;
export const PRESUPUESTO_MINIMO = 500;
export const PRESUPUESTO_MAXIMO = 5000;
export const PASO_PRESUPUESTO = 100;

export function formatearMonto(monto: number): string {
  return `L ${monto.toFixed(2)}`;
}
