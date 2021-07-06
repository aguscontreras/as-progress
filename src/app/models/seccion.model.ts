import { Pantalla } from '../interfaces/interfaces';

export class SeccionModel {
  nombre: string;
  id: string;
  tipo: number;
  tipoDescripcion: string;
  pantallas?: Pantalla[];
  children?: Pantalla[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = nombre.toLowerCase().replace(/\s/g, '');
    this.tipo = 2;
    this.tipoDescripcion = 'seccion';
  }
}
