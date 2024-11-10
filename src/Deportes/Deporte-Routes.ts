import { Router } from "express";
import { sanitizeDeporte, findAll, findOne, add, update, remove } from "./Deporte-Controller.js";

export const deporteRouter = Router();

 
deporteRouter.get('/', findAll);
deporteRouter.get('/:nombre', findOne)
deporteRouter.post('/', sanitizeDeporte, add )
deporteRouter.put('/:id', sanitizeDeporte, update)
deporteRouter.delete('/:nombre', remove)
