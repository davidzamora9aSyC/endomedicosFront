import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor.model'; 

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }

  buscarDoctores(ciudad: string, especialidad: string, tipoConsulta: string): Observable<Doctor[]> {
    const urlCompleta = `http://localhost:8080/busqueda/${especialidad}?tipoConsulta=${tipoConsulta}&ubicacion=${ciudad}`;

    console.log(`Enviando petición: ${urlCompleta}`);

    return this.http.get<Doctor[]>(urlCompleta);
  }
}
