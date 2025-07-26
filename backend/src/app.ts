import express from 'express';
import cors from 'cors'
import indexRouter from './routes';
import {errorHandler} from "./errorHandler";

const app = express();

app.use(cors())
app.use(express.json());
app.use('/', indexRouter);

app.use(errorHandler)

export default app;
