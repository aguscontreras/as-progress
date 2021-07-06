import { Grupo, Boton, Popup } from '../interfaces/interfaces';

export class PopupModel {
  tipo: number;
  tipoDescripcion: string;
  nombre: string;
  id: string;
  componente?: string;
  mxml?: string;
  estado?: number;
  grupos?: Grupo;
  botones?: Boton[];
  popups?: Popup[];
  children?: Boton[] | Popup[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = nombre.toLowerCase().replace(/\s/g, '');
    this.tipo = 4;
    this.tipoDescripcion = 'popup';
  }
}
