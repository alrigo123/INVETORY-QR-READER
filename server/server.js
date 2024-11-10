import express from 'express';
import { PORT } from "./config.js";
import cors from 'cors';
const app = express();

//Middleware
app.use(cors()); // allows to make requests such as form submissions
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