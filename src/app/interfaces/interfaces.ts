export interface AutositeTree {
  modulos: Modulo[];
}

export interface TipoItem {
  tipo: number;
  nombre: string;
}

export interface Modulo {
  nombre?: string;
  id?: string;
  tipo?: 1;
  tipo_desc?: 'modulo';
  secciones?: Seccion[];
  children?: Seccion[];
}

export interface Seccion {
  nombre?: string;
  id?: string;
  pantallas?: Pantalla[];
  children?: Pantalla[];
}

export interface Pantalla {
  tipo: number;
  nombre: string;
  id: string;
  estado: number;
  componente?: string;
  mxml?: string;
  ruta?: string;
  botones?: Boton[];
  popups?: Popup[];
  children?: Boton[] | Popup[];
}

export interface Boton {
  tipo?: number;
  nombre?: string;
  id?: string;
  estado?: number;
}

export interface Popup {
  tipo?: number;
  nombre?: string;
  id?: string;
  componente?: string;
  mxml?: string;
  estado?: number;
  grupos?: Grupo;
  botones?: Boton[];
  popups?: Popup[];
  children?: Boton[] | Popup[];
}

export interface Grupo {
  ventas?: boolean;
  contable?: boolean;
  comun?: boolean;
}

//  Tipos
/*
  1: Modulo
  2: Seccion
  3: Pantalla
  4: Popup
  5: Boton
*/
