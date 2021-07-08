import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';
import { Modulo, TipoItem } from './interfaces/interfaces';
import { TreeNode } from 'primeng/api';
import { ModuloModel } from './models/modulo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'autositeProgress';

  panelAgregarItem: boolean;
  panelDetalleItem: boolean;

  public modulos$: Observable<Modulo[]>;
  public modulosDB: Modulo[];
  public treeNode: TreeNode[];

  dropTipoItem: TipoItem[];
  selectedTipoItem: number;

  dropModulo: Modulo[];
  selectedModulo: string;

  nombre: string;
  id: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
