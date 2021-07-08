export class ModuloModel {
  nombre: string;
  id: string;
  tipo = 1;
  tipoDescripcion = 'modulo';
  prefijo = 'mod';
  secciones?: { [key: string]: true } = {};

  constructor(nombre: string) {
    this.nombre = nombre;
    this._id = this.nombre;
  }

  private set _id(nombre: string) {
    this.id = `${this.prefijo}-${nombre.toLowerCase().replace(/\s/g, '')}`;
  }
}
