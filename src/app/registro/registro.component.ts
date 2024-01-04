import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dia } from '../dia.model';
import { RegistroService } from './registro.service';
import { Doctor } from '../doctor.detalles.model';
import { ObjectId } from 'bson';
import { Tipo } from '../tipo.model';

export interface ApiResponseImagen {
  imagenUrl: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  rolSeleccionado: 'paciente' | 'doctor' = 'paciente';
  textoBoton: string;
  pasoActual: number = 1;

  nuevaDireccion: string = '';
  nuevaEspecialidad: string = '';
  lugarEstudio: string = '';
  nuevoServicio: string = '';
  precioServicio: number | null = null;

  imagenDoctor: File | null = null;
  tarjetaProfesional: File | null = null;

  direcciones: string[] = [];
  especialidades: Map<string, string> = new Map();
  servicios: { servicio: string, precio: number }[] = [];

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  urlDeLaImagen: string = "";

  bloques: { dia: Dia, inicio: string, fin: string, tipo: Tipo, fecha: Date }[] = [];
  nuevoBloque: { [key in Dia]?: { inicio: string, fin: string } } = {};


  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registroService: RegistroService,

  ) {
    this.textoBoton = 'Registrar';
    this.rolSeleccionado = 'paciente';

  }


  ngOnInit(): void {

  }

  get especialidadesArray() {
    return Array.from(this.especialidades.entries()).map(([key, value]) => ({ key, value }));
  }

  
  registrarDoctor(nombre: string, correo: string, contrasena: string, telefono: string, colegiado: string, descripcion: string){
    let imagenUrl: string = "";
    if (this.imagenDoctor) {
      this.registroService.cargarImagen(this.imagenDoctor).subscribe(
        (imagenUrl: string) => {
          this.urlDeLaImagen = imagenUrl;
        },
        error => {
          console.error('Error al cargar la imagen', error);
        }
      );
    }
    
    if (nombre && correo && contrasena && telefono && colegiado && descripcion) {
      const serviciosMap = new Map<string, number>(this.servicios.map(s => [s.servicio, s.precio]));

      const doctor: Doctor = {
        nombre,
        correo,
        telefono,
        colegiado,
        descripcion,
        especialidades: this.especialidades,
        _id: new ObjectId(),
        direcciones: this.direcciones,
        consultas: new Array<ObjectId>(),
        servicios: serviciosMap,
        horario: this.bloques,
        proxDate : new Date("2000-01-01"),
        imageUrl : this.urlDeLaImagen,
        
      };

      this.registroService.registrarDoctor(doctor).subscribe(
        respuesta => {
          console.log('Registro exitoso', respuesta);
        },
        error => {
          console.error('Error al registrar', error);
        }
      );
    } else {
      console.log("No se recibió algún parámetro");
    }
  }


  registrarPaciente(nombre: string, correo: string, contrasena: string, telefono: string) {

  }
  Paso(numero: number) {
    if (numero === 1) { this.pasoActual++; }
    else if (numero === -1) { this.pasoActual-- }

  }


  setActive(type: 'paciente' | 'doctor'): void {
    this.rolSeleccionado = type;

    if (this.rolSeleccionado == 'doctor') {
      this.textoBoton = 'Siguiente';
    } else if (this.rolSeleccionado === 'paciente') {
      this.textoBoton = 'Registrar';
    }
  }


  cargarImagenDoctor(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.imagenDoctor = input.files[0];
    } else {
      this.imagenDoctor = null;
    }
  }

  cargarTarjetaProfesionalFrente(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.tarjetaProfesional = input.files[0];
    } else {
      this.tarjetaProfesional = null;
    }
  }

  cargarTarjetaProfesionalTrasera(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.tarjetaProfesional = input.files[0];
    } else {
      this.tarjetaProfesional = null;
    }
  }



  convertirHoraADate(hora: string): Date {
    const fecha = new Date();
    const [horas, minutos] = hora.split(':').map(Number);
    fecha.setHours(horas, minutos, 0, 0);
    return fecha;
  }

  agregarBloque(diaString: string) {
    const dia: Dia = Dia[diaString as keyof typeof Dia];
    const inicio = (document.getElementById(`inicio-${diaString}`) as HTMLInputElement).value;
    const fin = (document.getElementById(`fin-${diaString}`) as HTMLInputElement).value;
    const tipo = Tipo.TRABAJO;
    const fecha = new Date("2000-01-01");

    if (dia && inicio && fin) {
      this.bloques.push({ dia: dia, inicio: inicio, fin: fin, tipo, fecha});
      (document.getElementById(`inicio-${diaString}`) as HTMLInputElement).value = '';
      (document.getElementById(`fin-${diaString}`) as HTMLInputElement).value = '';
    }
  }

  obtenerBloquesPorDia(dia: string) {
    console.log(dia);
    console.log(this.bloques);
    console.log(this.bloques.filter(bloque => bloque.dia === dia));
    return this.bloques.filter(bloque => bloque.dia === dia);
  }


  agregarDireccion(nuevaDireccion: string, inputElement: HTMLInputElement) {
    if (nuevaDireccion !== '') {
      this.direcciones.push(nuevaDireccion);
      inputElement.value = '';
    } else {
      alert("Por favor, ingresa una dirección antes de agregar.");
    }
  }

  agregarEspecialidad(nuevaEspecialidad: string, lugarEstudio: string, especialidadInput: HTMLInputElement, estudioInput: HTMLInputElement) {
    if (nuevaEspecialidad !== '' && lugarEstudio !== '') {
      this.especialidades.set(nuevaEspecialidad, lugarEstudio);
      especialidadInput.value = '';
      estudioInput.value = '';
    } else {
      alert("Por favor, completa ambos campos antes de agregar una especialidad.");
    }
  }

  agregarServicio(nuevoServicio: string, precio: string, servicioInput: HTMLInputElement, precioInput: HTMLInputElement) {
    let precioNumerico = parseFloat(precio);
    if (nuevoServicio !== '' && !isNaN(precioNumerico)) {
      this.servicios.push({ servicio: nuevoServicio, precio: precioNumerico });
      servicioInput.value = '';
      precioInput.value = '';
    } else {
      alert("Por favor, completa ambos campos antes de agregar un servicio.");
    }
  }


  eliminarDireccion(index: number) {
    this.direcciones.splice(index, 1);
  }

  eliminarEspecialidad(index: number) {
    const keys = Array.from(this.especialidades.keys());
    if (index >= 0 && index < keys.length) {
      const key = keys[index];

      this.especialidades.delete(key);
    } else {
      console.log('Índice fuera de rango');
    }
  }

  eliminarServicio(index: number) {
    this.servicios.splice(index, 1);
  }

  eliminarBloque(dia: string, index: number) {
    this.bloques = this.bloques.filter((bloque, i) => !(bloque.dia === dia && i === index));



  }
}
