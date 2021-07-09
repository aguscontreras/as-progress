export class BotonModel {
  nombre: string;
  tipo = 5;
  tipoDescripcion = 'boton';
  prefijo = 'bot';
  estado?: number;
  id: string;
  modulo?: { [key: string]: boolean } = {};
  seccion?: { [key: string]: boolean } = {};
  pantalla?: { [key: string]: boolean } = {};

  constructor(nombre: string) {
    this.nombre = nombre;
    this._id = nombre;
  }

  private set _id(nombre: string) {
    this.id = `${this.prefijo}-${nombre.toLowerCase().replace(/\s/g, '')}`;
  }

  set _modulo(moduloId: string) {
    if (moduloId && moduloId.length) {
      this.modulo[moduloId] = true;
    }
  }

  set _seccion(seccionId: string) {
    if (seccionId && seccionId.length) {
      this.seccion[seccionId] = true;
    }
  }

  set _pantalla(pantallaId: string) {
    if (pantallaId && pantallaId.length) {
      this.pantalla[pantallaId] = true;
    }
  }
}
