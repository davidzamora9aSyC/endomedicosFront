import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctoresComponent } from './doctores/doctores.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MapKeysPipe } from './busqueda/map-keys.pipe';
import { DetallesDoctorComponent } from './detalles-doctor/detalles-doctor.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    NavbarComponent,
    DoctoresComponent,
    BusquedaComponent,
    MapKeysPipe,
    DetallesDoctorComponent,
    RegistroComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
