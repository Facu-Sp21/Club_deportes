import express, { Request, Response, NextFunction } from 'express';
import {Deporte} from './Deportes/Clase-Deporte.js';
import { deporteRouter } from './Deportes/Deporte-Routes.js';

const app = express();

app.disable('x-powered-by'); // para que no aparezca express en el navegador
app.use(express.json());// habilitamos el uso de json
app.use('/deportes', deporteRouter);


app.listen(3000, () => {
    console.log('Server listening on port 3000');
})