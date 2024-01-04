import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor.model';
import { ApiResponse } from './api.response'; // Asumiendo que tienes un modelo ApiResponse
import { Paciente } from '../paciente.model';
import { map } from 'rxjs/operators';
import { ApiResponseImagen } from './imagen.api.response';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor(private http: HttpClient) { }

  registrarDoctor(doctor: Doctor): Observable<ApiResponse> { 
    const urlCompleta = 'http://localhost:8080/doctores/new'; 
    console.log(`Enviando petición: ${urlCompleta}`);
    return this.http.post<ApiResponse>(urlCompleta, doctor);
  }

  registrarPaciente(paciente:Paciente): Observable<ApiResponse> { 
    const urlCompleta = 'http://localhost:8080/pacientes/new'; 
    console.log(`Enviando petición: ${urlCompleta}`);
    return this.http.post<ApiResponse>(urlCompleta, paciente);
  }
  cargarImagen(imagenDoctor: File): Observable<string> {
    const urlCompleta = 'http://localhost:8080/imagenes/doctor/new';
    return this.http.post<ApiResponseImagen>(urlCompleta, imagenDoctor).pipe(
      map(response => response.imagenUrl)
    );
  }
}
