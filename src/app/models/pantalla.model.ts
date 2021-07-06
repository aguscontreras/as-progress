import { Boton, Popup } from '../interfaces/interfaces';

export class PantallaModel {
  tipo: number;
  tipoDescripcion: string;
  nombre: string;
  id: string;
  estado: number;
  componente?: string;
  mxml?: string;
  ruta?: string;
  botones?: Boton[];
  popups?: Popup[];
  children?: Boton[] | Popup[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = nombre.toLowerCase().replace(/\s/g, '');
    this.tipo = 3;
    this.tipoDescripcion = 'pantalla';
  }
}
