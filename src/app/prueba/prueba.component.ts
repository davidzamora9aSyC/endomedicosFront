import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent {
  images = [
    'assets/images/imagen1.jpg',
    'assets/images/imagen2.jpg',
    'assets/images/imagen3.jpg'
  ];
  activeConsultation: 'presencial' | 'virtual'  = 'presencial'; 

  setActive(type: 'presencial' | 'virtual'): void {
    this.activeConsultation = type;
  }
  constructor(private router: Router) {}

  buscarDoctores(ciudad: string, especialidad: string, tipoConsulta: string) {

    console.log({ ciudad, especialidad, tipoConsulta } );
    this.router.navigate(['/busqueda'], { queryParams: { ciudad, especialidad, tipoConsulta } })
    .catch(error => {
      console.error('Error durante la navegación:', error);
    });
  }
  
  irABusqueda() {
    this.router.navigate(['/busqueda']);
  }
}
