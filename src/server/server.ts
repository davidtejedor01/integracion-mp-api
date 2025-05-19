import express from 'express'
import cors from 'cors';
import mpRouter from './routes/mercadopago.ts';

const app = express();

app.use(cors({ // Incluir HTTPS de producción proximamente
    origin: ['http://localhost:5173', 'https://3ce2-2800-810-492-369-41e4-e424-da79-c6dd.ngrok-free.app'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use('/', mpRouter);

app.listen(process.env.PORT, () => { console.log(`Server listen on port: http://localhost:${process.env.PORT}`); });