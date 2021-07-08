export class SeccionModel {
  nombre: string;
  id: string;
  tipo = 2;
  tipoDescripcion = 'seccion';
  prefijo = 'sec';
  modulo?: { [key: string]: boolean } = {};
  pantallas?: { [key: string]: boolean } = {};

  constructor(nombre: string) {
    this.nombre = nombre;
    this._id = nombre;
  }

  private set _id(nombre: string) {
    this.id = `${this.prefijo}-${nombre.toLowerCase().replace(/\s/g, '')}`;
  }

  public set _modulo(moduloId: string) {
    if (moduloId && moduloId.length) {
      this.modulo[moduloId] = true;
    }
  }
}
