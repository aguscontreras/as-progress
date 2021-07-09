import { Grupo, Boton, Popup } from '../interfaces/interfaces';

export class PopupModel {
  nombre: string;
  id: string;
  tipo = 4;
  tipoDescripcion = 'popup';
  prefijo = 'pop';
  estado?: number;
  componente?: string;
  mxml?: string;
  modulo?: { [key: string]: boolean } = {};
  seccion?: { [key: string]: boolean } = {};
  botones?: { [key: string]: boolean } = {};
  popups?: { [key: string]: boolean } = {};
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

  public set _seccion(seccionId: string) {
    if (seccionId && seccionId.length) {
      this.seccion[seccionId] = true;
    }
  }

  public set _botones(botonId: string) {
    if (botonId && botonId.length) {
      this.botones[botonId] = true;
    }
  }

  public set _popups(pupupId: string) {
    if (pupupId && pupupId.length) {
      this.popups[pupupId] = true;
    }
  }

  public set _pantallas(pantallaId: string) {
    if (pantallaId && pantallaId.length) {
      this.pantallas[pantallaId] = true;
    }
  }
}
