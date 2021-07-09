import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { TreeModule } from 'primeng/tree';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';

import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [AppComponent, AddItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ScrollingModule,
    TreeModule,
    PanelModule,
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    ChipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
