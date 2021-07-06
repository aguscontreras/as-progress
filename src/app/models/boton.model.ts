export class Boton {
  tipo: number;
  tipoDescripcion: string;
  nombre: string;
  id: string;
  estado?: number;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = nombre.toLowerCase().replace(/\s/g, '');
    this.tipo = 4;
    this.tipoDescripcion = 'popup';
  }
}
