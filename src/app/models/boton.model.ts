export class BotonModel {
  nombre: string;
  tipo = 5;
  tipoDescripcion = 'boton';
  prefijo = 'bot';
  estado?: number;
  private id: string;
  private modulo?: { [key: string]: boolean } = {};
  private seccion?: { [key: string]: boolean } = {};
  private pantalla?: { [key: string]: boolean } = {};

  constructor(nombre: string) {
    this.nombre = nombre;
    this._id = nombre;
  }

  get _id(): string {
    return this.id;
  }

  private set _id(nombre: string) {
    this.id = `${this.prefijo}-${nombre.toLowerCase().replace(/\s/g, '')}`;
  }

  get _modulo(): any {
    return this.modulo;
  }

  set _modulo(moduloId: string) {
    if (moduloId && moduloId.length) {
      this.modulo[moduloId] = true;
    }
  }

  get _seccion(): any {
    return this.seccion;
  }

  set _seccion(seccionId: string) {
    if (seccionId && seccionId.length) {
      this.seccion[seccionId] = true;
    }
  }

  get _pantalla(): any {
    return this.pantalla;
  }

  set _pantalla(pantallaId: string) {
    if (pantallaId && pantallaId.length) {
      this.pantalla[pantallaId] = true;
    }
  }
}
