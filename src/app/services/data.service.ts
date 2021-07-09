import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ModuloModel } from '../models/modulo.model';
import { SeccionModel } from '../models/seccion.model';
import { Boton, Pantalla, Popup } from '../interfaces/interfaces';
import { PantallaModel } from '../models/pantalla.model';

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

  public abmBoton(boton: Boton, url: string): void {
    const REF = this.db.object(url);
    REF.update(boton);
  }

  public abmPopup(popup: Popup, url: string): void {
    const REF = this.db.object(url);
    REF.update(popup);
  }
}
