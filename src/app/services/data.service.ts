import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ModuloModel } from '../models/modulo.model';
import { SeccionModel } from '../models/seccion.model';
import {
  Modulo,
  Boton,
  Seccion,
  Pantalla,
  Popup,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private modulosDB: any;

  constructor(private db: AngularFireDatabase) {
    //  this.modulosDB = this.db.list('modulos').valueChanges();
    //  console.log(this.modulosDB);
  }

  public getModulos(): Observable<Modulo[]> {
    const values = this.db.list<Modulo>('modulos').valueChanges();
    console.log(values);

    const valuesObj = this.db.object<Modulo[]>('modulos').valueChanges();
    console.log(valuesObj);

    const treeNode = this.db.list('treeNode').valueChanges();

    return treeNode;
  }

  public abmModulo(modulo: ModuloModel): void {
    const REF = this.db.object(`modulos/${modulo.id}`);
    REF.update(modulo);
  }

  public abmSeccion(seccion: SeccionModel, moduloId: string): void {
    const REF = this.db.object(`modulos/${moduloId}/secciones/${seccion.id}`);
    REF.update(seccion);
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
