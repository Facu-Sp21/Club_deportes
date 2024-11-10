import { ObjectId } from "mongodb";
import { Horario } from "../Horarios/Clase-Horario.js";
export class Deporte {
    constructor(
        public nombre: string,
        public horario: Horario[],
        public costo: number,
        public cupo: number,
        public _id?: ObjectId
        )
       
    {}
}


