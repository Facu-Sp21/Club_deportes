import 'reflect-metadata';
import express from 'express';
import { deporteRouter } from './Deportes/Deporte-Routes.js';
import { orm, syncSchema } from './db/orm.js';
import { RequestContext } from '@mikro-orm/core';
const app = express();
app.disable('x-powered-by'); // para que no aparezca express en el navegador
app.use(express.json()); // habilitamos el uso de json
app.use((req, res, next) => { RequestContext.create(orm.em, next); });
app.use('/deportes', deporteRouter);
await syncSchema(); // solo en desarrollo
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=app.js.map