import { Categoria, Gasto, NivelPresupuesto, TotalCategoria } from './Gasto';

export type ResumenCardProps = {
  presupuesto: number;
  totalGastado: number;
  totalPendiente: number;
  totalVisible: number;
  porcentajeUsado: number;
  nivelPresupuesto: NivelPresupuesto;
  excedente: number;
  categoriaMayor: TotalCategoria | null;
};

export type OpcionChip<T extends string> = {
  valor: T;
  etiqueta: string;
};

export type ChipGroupProps<T extends string> = {
  opciones: OpcionChip<T>[];
  seleccionado: T;
  onSeleccionar: (valor: T) => void;
};

export type GastoItemProps = {
  gasto: Gasto;
  posicion: number;
  onAlternarPagado: (id: number) => void;
  onEliminar: (id: number) => void;
};

export type AvisoDeshacerProps = {
  descripcion: string;
  onDeshacer: () => void;
};

export type FormularioGastoProps = {
  descripcion: string;
  monto: string;
  categoria: Categoria;
  errorDescripcion: string | null;
  errorMonto: string | null;
  deshabilitado: boolean;
  onCambiarDescripcion: (texto: string) => void;
  onCambiarMonto: (texto: string) => void;
  onCambiarCategoria: (categoria: Categoria) => void;
  onAgregar: () => void;
};
