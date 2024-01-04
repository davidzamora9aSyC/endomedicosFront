import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from './doctor.service';
import { Doctor } from '../doctor.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})

export class BusquedaComponent implements OnInit {
  doctores: Doctor[] = [];
  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    // Obtener parámetros de consulta del URL
    this.route.queryParams.subscribe(params => {
      const ciudad = params['ciudad'];
      const especialidad = params['especialidad'];
      const tipoConsulta = params['tipoConsulta'];

      // Verifica que los parámetros existan antes de hacer la llamada
      if (especialidad && tipoConsulta) {
        this.realizarBusqueda(ciudad, especialidad, tipoConsulta);
      } else{
        console.log("no se recibio algun parametro")
      }
      console.log(ciudad)
    });
  }
  
  obtenerDoctor(nombre: String) {

    console.log("buscando" );
    console.log(nombre);
    this.router.navigate(['/busqueda/detalles'], { queryParams: { nombre } })
    .catch(error => {
      console.error('Error durante la navegación:', error);
    });
  }

  realizarBusqueda(ciudad: string, especialidad: string, tipoConsulta: string) {
    this.doctorService.buscarDoctores(ciudad, especialidad, tipoConsulta)
      .subscribe(
        data => {
          this.doctores = data;
          console.log(data);
        },
        error => {
          console.error('Error en la petición:', error); 
        }
      );
  }

}
