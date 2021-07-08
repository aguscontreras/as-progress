import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ModuloModel } from '../models/modulo.model';
import { SeccionModel } from '../models/seccion.model';
import { Boton, Pantalla, Popup } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private db: AngularFireDatabase) {}

  public getModulos(): Observable<ModuloModel[]> {
    const modulosRef$ = this.db.list<ModuloModel>('modulos').valueChanges();
    return modulosRef$;
  }

  public abmModulo(modulo: ModuloModel): Promise<void> {
    const REF_MODULOS = this.db.object(`modulos/${modulo.id}`);
    return REF_MODULOS.update(modulo);
  }

  public abmSeccion(seccion: SeccionModel): Promise<void> {
    const REF_SECCIONES = this.db.object(`secciones/${seccion.id}`);
    const MODULO = Object.keys(seccion.modulo)[0];

    this.db
      .object(`modulos/${MODULO}/secciones`)
      .update({ [seccion.id]: true });

    return REF_SECCIONES.update(seccion);
  }

  public abmPantalla(
    pantalla: Pantalla,
    moduloId: string,
    seccionId: string
  ): void {
    const REF = this.db.object(
      `modulos/${moduloId}/secciones/${seccionId}/pantallas/${pantalla.id}`
    );
    REF.update(pantalla);
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
