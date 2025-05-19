import MPController from '../controllers/MPController';
import express from 'express';
const mpRouter = express.Router();

mpRouter.post("/crearPreferencia", MPController.crearPreferencia);

mpRouter.post("/webhook", MPController.webhook);



export default mpRouter;
