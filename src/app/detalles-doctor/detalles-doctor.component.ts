import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorDetallesService } from './doctor.detalles.service';
import { Doctor } from '../doctor.detalles.model';

@Component({
  selector: 'app-detalles-doctor',
  templateUrl: './detalles-doctor.component.html',
  styleUrls: ['./detalles-doctor.component.scss']
})
export class DetallesDoctorComponent implements OnInit {
  doctor!: Doctor;
  
  constructor(
    private router: Router,
    private doctorService: DoctorDetallesService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const nombre = params['nombre'];

      if (nombre) {
        this.realizarBusqueda(nombre);
      } else {
        console.log("no se recibio algun parametro")
      }
      console.log(nombre)
    });
  }

  realizarBusqueda(nombre: string) {
    this.doctorService.buscarDoctor(nombre)
      .subscribe(
        data => {
          this.doctor = data;
          console.log(data);
        },
        error => {
          console.error('Error en la petición:', error); 
        }
      );
      }
}
