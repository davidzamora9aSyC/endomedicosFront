import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetallesDoctorComponent } from './detalles-doctor/detalles-doctor.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'busqueda/detalles', component: DetallesDoctorComponent },
  { path: 'registrate', component: RegistroComponent },
  { path: '', component: PruebaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
