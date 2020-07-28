import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './Modules/material.module';
import { ImportColisRecuComponent } from './Components/import-colis-recu/import-colis-recu.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DateFormatPipe } from './Pipes/DateFormatPipe/date-format.pipe';
import { ConfirmDialogueComponent } from './Components/confirm-dialogue/confirm-dialogue.component';
import { AddColisExpComponent } from './Components/add-colis-exp/add-colis-exp.component';
import { ListColisExpComponent } from './Components/list-colis-exp/list-colis-exp.component';
import { NavbarComponent } from './Components/admin/navbar/navbar.component';
import { SidebarComponent } from './Components/admin/sidebar/sidebar.component';
import {DashboardComponent} from './Components/admin/dashboard/dashboard.component';
import {ListColisRecuComponent} from './Components/list-colis-recu/list-colis-recu.component';
import { LayoutComponent } from './Components/layout/layout.component';
@NgModule({
  declarations: [
    AppComponent,
    ImportColisRecuComponent,
    LoginComponent,
    DateFormatPipe,
    DashboardComponent,
    ConfirmDialogueComponent,
    AddColisExpComponent,
    ListColisRecuComponent,
    ListColisExpComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
