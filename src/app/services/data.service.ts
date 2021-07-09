import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ModuloModel } from '../models/modulo.model';
import { SeccionModel } from '../models/seccion.model';
import { PantallaModel } from '../models/pantalla.model';
import { PopupModel } from '../models/popup.model';
import { BotonModel } from '../models/boton.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private db: AngularFireDatabase) {}

  public getModulos(): Observable<ModuloModel[]> {
    const modulosRef$ = this.db.list<ModuloModel>('modulos').valueChanges();
    return modulosRef$;
  }

  public getSecciones(): Observable<SeccionModel[]> {
    const seccionesRef$ = this.db
      .list<SeccionModel>('secciones')
      .valueChanges();
    return seccionesRef$;
  }

  public getPantallas(): Observable<PantallaModel[]> {
    const pantallasRef = this.db
      .list<PantallaModel>('pantallas')
      .valueChanges();
    return pantallasRef;
  }

  public abmModulo(modulo: ModuloModel): Promise<void> {
    const REF_MODULOS = this.db.object(`modulos/${modulo.id}`);
    return REF_MODULOS.update(modulo);
  }

  public abmSeccion(seccion: SeccionModel): Promise<void> {
    const REF_SECCIONES = this.db.object(`secciones/${seccion.id}`);
    const MODULO_ID = Object.keys(seccion.modulo)[0];

    this.db
      .object(`modulos/${MODULO_ID}/secciones`)
      .update({ [seccion.id]: true });

    return REF_SECCIONES.update(seccion);
  }

  public abmPantalla(pantalla: PantallaModel): Promise<void> {
    const REF_PANTALLAS = this.db.object(`pantallas/${pantalla.id}`);
    const SECCION_ID = Object.keys(pantalla.seccion)[0];
    //  const MODULO_ID = Object.keys(pantalla.modulo)[0];
    this.db
      .object(`secciones/${SECCION_ID}/pantallas`)
      .update({ [pantalla.id]: true });

    return REF_PANTALLAS.update(pantalla);
  }

  public abmPopup(popup: PopupModel): void {
    const REF_POPUPS = this.db.object(`popups/${popup.id}`);
    const SECCION_ID = Object.keys(popup.seccion)[0];
    const PANTALLA_ID = Object.keys(popup.pantallas)[0];
  }

  public abmBoton(boton: BotonModel): Promise<void> {
    console.log(boton);

    const SECCION_ID = Object.keys(boton._seccion)[0];
    const MODULO_ID = Object.keys(boton._modulo)[0];
    const PANTALLA_ID = Object.keys(boton._pantalla)[0];

    const REF_BOTONES = this.db.object(`botones/${boton._id}`);
    const REF_PANTALLAS = this.db.object(`pantallas/${PANTALLA_ID}/botones`);
    const REF_SECCIONES = this.db.object(`secciones/${SECCION_ID}/botones`);
    const REF_MODULOS = this.db.object(`modulos/${MODULO_ID}/botones`);

    REF_SECCIONES.update({ [boton._id]: true });
    REF_MODULOS.update({ [boton._id]: true });
    REF_PANTALLAS.update({ [boton._id]: true });

    return REF_BOTONES.update(boton);
  }
}
