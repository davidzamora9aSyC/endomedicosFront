

import { ObjectId } from 'bson';
import { Dia } from './dia.model';
import { Tipo  } from './tipo.model';
export interface Doctor {
  _id: ObjectId;
  nombre: string;
  especialidades: Map<string, string>;
  direcciones: string[];
  consultas: ObjectId[];
  servicios: Map<String, number>;
  horario: Info[];
  proxDate: Date;
  imageUrl: String;
  correo: String;
  telefono: string;
  colegiado: String;
  descripcion: String;
}

export interface Info {
  dia: Dia;
  inicio: string;
  fin: string;
  tipo: Tipo;
  fecha: Date;
}
