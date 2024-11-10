import { Request, Response, NextFunction } from 'express';
import { Deporte } from './Clase-Deporte.js';
import { RepositoryDeporte } from "./Repository-Deporte.js";

const BDdeportes = new RepositoryDeporte();


export function sanitizeDeporte (req: Request , res: Response , next: NextFunction) {
    req.body.sanitizeDeporte = {
        nombre: req.body.nombre,
        horario: req.body.horario,
        costo: req.body.costo,
        cupo: req.body.cupo
    }
    Object.keys(req.body.sanitizeDeporte).forEach((key) => {
        if (req.body.sanitizeDeporte[key] === undefined) {
          delete req.body.sanitizeDeporte[key]
        }
      })
      next()
}

export async function findAll(req:Request, res:Response){
    res.json(await BDdeportes.findAll()); 
}

export async function findOne(req:Request, res:Response){
    const deporteSeleccionado = await BDdeportes.findOne({nombre: req.params.nombre});
    if(deporteSeleccionado === undefined){
        return res.status(404).json({ message: 'Deporte no encontrado' });
    }
    res.json(deporteSeleccionado);
}

export async function add(req:Request, res:Response){
    const nuevo = req.body.sanitizeDeporte;
    const nuevoDeporte = new Deporte(nuevo.nombre, nuevo.horario, nuevo.costo, nuevo.cupo);
    res.json(await BDdeportes.add(nuevoDeporte));
}

export async function update(req:Request, res:Response){
    req.body.sanitizeDeporte._id = req.params.id;

    if(await BDdeportes.update(req.body.sanitizeDeporte) === undefined){
        res.json({ message: 'Deporte no encontrado' });
        
        console.log(req.body.sanitizeDeporte);
    }else{ 
        res.json({ message: 'Deporte actualizado con exito' });

        
}
}


   
export async function remove (req:Request, res:Response){
    const eliminado = await BDdeportes.delete({nombre: req.params.nombre});
    if (eliminado === undefined) {
        return res.status(404).json({ message: 'Deporte no encontrado' });
    }
    res.json({
        message: 'Deporte eliminado con exito',
        deporteEliminado: eliminado
    });
}