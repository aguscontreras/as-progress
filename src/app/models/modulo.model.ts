import { Seccion } from '../interfaces/interfaces';

export class ModuloModel {
  nombre: string;
  id?: string;
  tipo?: number;
  tipoDescripcion?: string;
  secciones?: Seccion[];
  children?: Seccion[];

  constructor(nombre: string) {
    this.tipo = 1;
    this.tipoDescripcion = 'modulo';
    this.nombre = nombre;
    this.id = nombre.toLowerCase().replace(/\s/g, '');
  }
}
