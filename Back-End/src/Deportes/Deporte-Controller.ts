import { Request, Response, NextFunction } from 'express';
import { Deporte } from './Deporte.entity.js';
import { Horario } from '../Horarios/Horario.entity.js';
import { orm} from '../db/orm.js';


const em = orm.em

async function validateHorario (horarios: Horario[], deporte: Deporte) {
    if (horarios) {                    // me aseguro que solo se actualicen los horarios si los hay
            
        deporte.horarios.removeAll()  // limpio los horarios existentes
        const nuevosHorarios = await Promise.all( // indico que voy a trabajar con un array de promesas
            horarios.map(async (horario: any) => {
                if (horario.id) {
                    return em.getReference(Horario, horario.id); // Vincula horario existente
                } else {
                    const existeHorario = await em.findOne(Horario, { dia: horario.dia, hora_inicio: horario.hora_inicio, hora_fin: horario.hora_fin })
                    if (existeHorario) {
                        
                        return existeHorario
                    }
                    const nuevoHorario = em.create(Horario, horario); // Crea horario nuevo
                    em.persist(nuevoHorario);
                    return nuevoHorario;
                }
            })
        );

        deporte.horarios.add(nuevosHorarios); // Agrega los nuevos horarios
    
    }
}

export function sanitizeDeporte (req: Request , res: Response , next: NextFunction) {

    req.body.sanitizeDeporte = {
        nombre: req.body.nombre,
        horarios: req.body.horarios,
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
    try{
        const deportes = await em.find(Deporte, {});
        
        res.status(200).json({message: 'Lista de deportes', data: deportes})    
    }catch(error:any){
        res.status(500).json({ message: error.message })
    }  
}
export async function findOne(req:Request, res:Response){
    try{
        const deporte = await em.findOneOrFail(Deporte, { nombre: req.params.nombre });

        res.status(200).json({message: 'Deporte encontrado', data: deporte})
        
    }catch(error:any){
        res.status(500).json({ message: error.message })
    }
}

export async function add(req:Request, res:Response){
    try{
        
        const {horarios, ...deporteData} = req.body.sanitizeDeporte
        const deporte = em.create(Deporte, deporteData)
        await validateHorario(horarios, deporte)
        await em.flush();

        res.status(200).json({message: 'Deporte creado', data: deporte})
    }
    catch(error:any){
        res.status(500).json({ message: error.message })
    }
}

export async function update(req: Request, res: Response) {
    try {
        const deporte = await em.findOneOrFail(Deporte, { id: parseInt(req.params.id) }) // traigo el deporte que quiero actualizar
        const horariosAntiguos = deporte.horarios.getItems() // guardo los horarios antiguos
        const {horarios, ...deporteData} = req.body.sanitizeDeporte // separo de la req el horario de los demas datos
        
        em.assign(deporte, deporteData) // actualizo los demas datos   
       
        await validateHorario(horarios, deporte) // actualizo los horarios
        await em.flush()
        // Revisar los horarios antiguos
        await Promise.all(horariosAntiguos.map(async (horario: Horario) => {
            const isUsed = await em.findOne(Deporte, { horarios: horario });
            if (!isUsed) {
                await em.removeAndFlush(horario); // Elimina el horario si no está asociado a otro deporte
            }
        }))
        await em.flush()
        res.status(200).json({ message: 'Deporte actualizado', data: deporte })
    } catch (error: any) {
        res.status(500).json({ message: "Error al actualizar el deporte" })
}}


export async function remove(req: Request, res: Response) {
    try {
        const refDeporte = await em.findOneOrFail(Deporte, { id: parseInt(req.params.id) }); 
        const horariosToCheck = refDeporte.horarios.getItems(); // Obtiene los horarios asociados
        
        await em.removeAndFlush(refDeporte); // Elimina el deporte
        
        // Revisar los horarios
        await Promise.all(horariosToCheck.map(async (horario: Horario) => {
            const isUsed = await em.findOne(Deporte, { horarios: horario });
            if (!isUsed) {
                await em.removeAndFlush(horario); // Elimina el horario si no está asociado a otro deporte
            }
        }));
        
        res.status(200).json({ message: 'Deporte eliminado', data: refDeporte });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
