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
    ]).subscribe({
      next: ([modulos, secciones]) => {
        this.modulos = modulos;
        this.secciones = secciones;

        this.dropModulo = this.modulos;
        this.dropSecciones = this.secciones;
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
    console.log(modulo);
    console.log(this.dropSecciones);

    this.dropSecciones = this.secciones.filter(
      (item) => item.modulo[modulo] === true
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
      default:
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
    const { nombre, modulo, seccion } = this.formAddItem.getRawValue();
    const pantalla = new PantallaModel(nombre);
    pantalla._modulo = modulo;
    pantalla._seccion = seccion;

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
