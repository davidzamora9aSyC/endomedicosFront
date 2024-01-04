import { ObjectId } from 'bson'; // Asegúrate de tener esta dependencia o ajusta según tu implementación
import { Dia } from './dia.model';

export interface Doctor {
  _id: ObjectId;
  nombre: string;
  especialidades: Map<string, string>;
  direcciones: string[];
  consultas: ObjectId[];
  horario: Info[];
  proxDate: Date;
  imageUrl: String;
}

export interface Info {
  dia: Dia;
  inicio: string; // Formato de hora, ajusta según necesites
  fin: string; // Formato de hora, ajusta según necesites
  tipo: Tipo;
  fecha: Date; // O ajusta a LocalDate si tienes una implementación específica en Angular
}

export enum Tipo {
  TRABAJO = 'TRABAJO',
  BLOQUEO = 'BLOQUEO',
}
