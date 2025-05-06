import express from 'express'
import cors from 'cors';
import mpRouter from './routes/mercadopago';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Asegúrate que coincida con tu puerto de Vite
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use('/', mpRouter);

app.listen(3000, () => { console.log('Server listen on port: http://localhost:3000'); });