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
    const pantallasRef$ = this.db
      .list<PantallaModel>('pantallas')
      .valueChanges();
    return pantallasRef$;
  }

  public abmModulo(modulo: ModuloModel): Promise<void> {
    const REF_MODULOS = this.db.object(`modulos/${modulo.id}`);
    return REF_MODULOS.update(modulo);
  }

  public abmSeccion(seccion: SeccionModel): Promise<void> {
    const MODULO_ID = Object.keys(seccion.modulo)[0];
    const REF_MODULOS = this.db.object(`modulos/${MODULO_ID}/secciones`);
    const REF_SECCIONES = this.db.object(`secciones/${seccion.id}`);

    REF_MODULOS.update({ [seccion.id]: true });
    return REF_SECCIONES.update(seccion);
  }

  public abmPantalla(pantalla: PantallaModel): Promise<void> {
    const SECCION_ID = Object.keys(pantalla.seccion)[0];
    const MODULO_ID = Object.keys(pantalla.modulo)[0];
    const REF_MODULOS = this.db.object(`modulos/${MODULO_ID}/pantallas`);
    const REF_SECCIONES = this.db.object(`secciones/${SECCION_ID}/pantallas`);
    const REF_PANTALLAS = this.db.object(`pantallas/${pantalla.id}`);

    REF_SECCIONES.update({ [pantalla.id]: true });
    REF_MODULOS.update({ [pantalla.id]: true });
    return REF_PANTALLAS.update(pantalla);
  }

  public abmPopup(popup: PopupModel): Promise<void> {
    const MODULO_ID = Object.keys(popup.modulo)[0];
    const SECCION_ID = Object.keys(popup.seccion)[0];
    const PANTALLA_ID = Object.keys(popup.pantallas)[0];
    const REF_MODULOS = this.db.object(`modulos/${MODULO_ID}/popups`);
    const REF_SECCIONES = this.db.object(`secciones/${SECCION_ID}/popups`);
    const REF_PANTALLAS = this.db.object(`pantallas/${PANTALLA_ID}/popups`);
    const REF_POPUPS = this.db.object(`popups/${popup.id}`);

    REF_MODULOS.update({ [popup.id]: true });
    REF_SECCIONES.update({ [popup.id]: true });
    REF_PANTALLAS.update({ [popup.id]: true });
    return REF_POPUPS.update(popup);
  }

  public abmBoton(boton: BotonModel): Promise<void> {
    console.log(boton);
    const SECCION_ID = Object.keys(boton.seccion)[0];
    const MODULO_ID = Object.keys(boton.modulo)[0];
    const PANTALLA_ID = Object.keys(boton.pantalla)[0];
    const REF_MODULOS = this.db.object(`modulos/${MODULO_ID}/botones`);
    const REF_SECCIONES = this.db.object(`secciones/${SECCION_ID}/botones`);
    const REF_PANTALLAS = this.db.object(`pantallas/${PANTALLA_ID}/botones`);
    const REF_BOTONES = this.db.object(`botones/${boton.id}`);

    REF_SECCIONES.update({ [boton.id]: true });
    REF_MODULOS.update({ [boton.id]: true });
    REF_PANTALLAS.update({ [boton.id]: true });
    return REF_BOTONES.update(boton);
  }
}
