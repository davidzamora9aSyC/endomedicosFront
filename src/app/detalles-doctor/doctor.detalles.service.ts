import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor.detalles.model';
 

@Injectable({
  providedIn: 'root'
})
export class DoctorDetallesService {
  constructor(private http: HttpClient) { }

  buscarDoctor(nombre: string): Observable<Doctor> {
    const urlCompleta = `http://localhost:8080/busqueda/detalles/${nombre}`;

    console.log(`Enviando petición: ${urlCompleta}`);

    return this.http.get<Doctor>(urlCompleta);
  }
}
