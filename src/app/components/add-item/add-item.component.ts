import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ModuloModel } from '../../models/modulo.model';
import { SeccionModel } from '../../models/seccion.model';
import { PantallaModel } from '../../models/pantalla.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styles: [],
})
export class AddItemComponent implements OnInit {
  @Output() closePanelEvent = new EventEmitter<boolean>();

  formAddItem: FormGroup;

  dropTipoItem: SelectItem[];
  dropEstados: SelectItem[];
  dropModulo: ModuloModel[];
  dropSecciones: SeccionModel[];
  dropPantallas: PantallaModel[];

  constructor(private fb: FormBuilder) {
    this.createFormNewItem();
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
  }

  private createFormNewItem(): void {
    this.formAddItem = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: [0],
      modulo: [''],
      seccion: [''],
      pantalla: [''],
      componente: [''],
      mxml: [''],
    });
  }

  addItem(): void {
    console.log(this.formAddItem.value);
  }

  closePanel(): void {
    this.closePanelEvent.emit(false);
  }
}
