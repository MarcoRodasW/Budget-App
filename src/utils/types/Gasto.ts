export type Categoria = 'comida' | 'transporte' | 'ocio' | 'estudio';

export type Gasto = {
  id: number;
  descripcion: string;
  categoria: Categoria;
  monto: number;
  pagado: boolean;
};

export type FiltroCategoria = Categoria | 'todas';

export type TotalCategoria = {
  categoria: Categoria;
  total: number;
};

export type NivelPresupuesto = 'normal' | 'alerta' | 'excedido';

export type GastoEliminado = {
  gasto: Gasto;
  indice: number;
};
