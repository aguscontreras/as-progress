import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { ModuloModel } from '../../models/modulo.model';
import { SeccionModel } from '../../models/seccion.model';
import { PantallaModel } from '../../models/pantalla.model';
import { DataService } from '../../services/data.service';
import { combineLatest, Subscription } from 'rxjs';
import { PopupModel } from '../../models/popup.model';
import { BotonModel } from '../../models/boton.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styles: [],
})
export class AddItemComponent implements OnInit, OnDestroy {
  @Output() closePanelEvent = new EventEmitter<boolean>();

  formAddItem: FormGroup;

  dropTipoItem: SelectItem[];
  dropEstados: SelectItem[];
  dropModulo: ModuloModel[];
  dropSecciones: SeccionModel[];
  dropPantallas: PantallaModel[];

  private modulos: ModuloModel[];
  private secciones: SeccionModel[];
  private pantallas: PantallaModel[];

  messages: Message[];

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private _dataService: DataService) {
    this.createFormNewItem();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.dropTipoItem = [
      { value: 1, label: 'Módulo' },
      { value: 2, label: 'Sección' },
      { value: 3, label: 'Pantalla' },
      { value: 4, label: 'Popup' },
      { value: 5, label: 'Botón' },
    ];

    this.dropEstados = [
      { label: 'Pendiente', value: 0 },
      { label: 'Maquetado', value: 1 },
      { label: 'Finalizado', value: 2 },
      { label: 'Revisión', value: 3 },
    ];

    const SUBSCRIPTION = combineLatest([
      this._dataService.getModulos(),
      this._dataService.getSecciones(),
      this._dataService.getPantallas(),
    ]).subscribe({
      next: ([modulos, secciones, pantallas]) => {
        this.modulos = modulos;
        this.secciones = secciones;
        this.pantallas = pantallas;

        this.dropModulo = this.modulos;
        this.dropSecciones = this.secciones;
        this.dropPantallas = this.pantallas;
      },
    });

    this.subscriptions.push(SUBSCRIPTION);
  }

  private createFormNewItem(): void {
    this.formAddItem = this.fb.group({
      nombre: ['', Validators.required],
      tipo: [1, Validators.required],
      estado: [0],
      modulo: [''],
      seccion: [''],
      pantalla: [''],
      componente: [''],
      mxml: [''],
    });
  }

  public filterSeccionesByModulo(modulo: string): void {
    this.dropSecciones = this.secciones.filter(
      (item) => item.modulo[modulo] === true
    );
  }

  public filterPantallasBySeccion(seccion: string): void {
    this.dropPantallas = this.pantallas.filter(
      (item) => item.seccion[seccion] === true
    );
  }

  addItem(): void {
    if (this.formAddItem.invalid) {
      return;
    }

    console.log(this.formAddItem.value);

    switch (this.formAddItem.get('tipo').value) {
      case 1:
        this.newModulo();
        break;
      case 2:
        this.newSeccion();
        break;
      case 3:
        this.newPantalla();
        break;
      case 4:
        this.newPopup();
        break;
      default:
        this.newBoton();
        break;
    }
  }

  private newModulo(): void {
    const { nombre } = this.formAddItem.getRawValue();
    const modulo = new ModuloModel(nombre);
    this._dataService
      .abmModulo(modulo)
      .then((_) => {
        this.showSuccessMessage('Módulo añadido satisfactoriamente');
        this.formAddItem.reset();
      })
      .catch((err) => {
        console.error(err);
        this.showErrorMessage();
      });
  }

  private newSeccion(): void {
    const { nombre, modulo } = this.formAddItem.getRawValue();
    const seccion = new SeccionModel(nombre);
    seccion._modulo = modulo;
    this._dataService
      .abmSeccion(seccion)
      .then((_) => {
        this.showSuccessMessage('Sección añadida satisfactoriamente');
        this.formAddItem.reset();
      })
      .catch((err) => {
        console.error(err);
        this.showErrorMessage();
      });
  }

  private newPantalla(): void {
    const { nombre, modulo, seccion, estado, componente, mxml } =
      this.formAddItem.getRawValue();
    const pantalla = new PantallaModel(nombre);
    pantalla._modulo = modulo;
    pantalla._seccion = seccion;
    pantalla.estado = estado;
    pantalla.componente = componente;
    pantalla.mxml = mxml;

    this._dataService
      .abmPantalla(pantalla)
      .then((_) => {
        this.showSuccessMessage('Pantalla añadida satisfactoriamente');
        this.formAddItem.reset();
      })
      .catch((err) => {
        console.error(err);
        this.showErrorMessage();
      });
  }

  private newBoton(): void {
    const { nombre, modulo, seccion, pantalla, estado } =
      this.formAddItem.getRawValue();

    const boton = new BotonModel(nombre);
    boton._modulo = modulo;
    boton._seccion = seccion;
    boton._pantalla = pantalla;
    boton.estado = estado;

    this._dataService
      .abmBoton(boton)
      .then((_) => {
        this.showSuccessMessage('Botón añadido satisfactoriamente');
        this.formAddItem.reset();
      })
      .catch((err) => {
        console.error(err);
        this.showErrorMessage();
      });
  }

  private newPopup(): void {
    return;

    //  TODO: Form para Pupup

    const { nombre, modulo, seccion, estado, componente, mxml, pantalla } =
      this.formAddItem.getRawValue();

    const popup = new PopupModel(nombre);
    popup._modulo = modulo;
    popup._seccion = seccion;
    popup.estado = estado;
    popup.componente = componente;
    popup.mxml = mxml;
  }

  showSuccessMessage(detail: string): void {
    const successMessage: Message = {
      severity: 'success',
      summary: 'Mensaje',
      detail,
    };

    console.log(successMessage);
    this.messages = [successMessage];
  }

  showErrorMessage(): void {
    const errorMessage: Message = {
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error',
    };

    this.messages = [errorMessage];
  }

  closePanel(): void {
    this.closePanelEvent.emit(false);
  }
}
