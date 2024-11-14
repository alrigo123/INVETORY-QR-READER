import express from 'express';
import { PORT } from "./config.js";
import cors from 'cors';
const app = express();

//Middleware
// Configuración CORS para permitir accesos desde cualquier origen (o especificar la IP del cliente)
app.use(cors({ origin: '*' }));
app.use(express.json()) //process data to send to the backend

//Routes
import routes from './routes/index.routes.js';
import item_routes from './routes/item.routes.js';

//app
app.use(routes)
app.use(item_routes)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});