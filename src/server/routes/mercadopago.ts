import MPController from '../controllers/MPController'
import express from 'express'

const mpRouter = express.Router()

mpRouter.post("/crearPreferencia", MPController.crearPreferencia)
mpRouter.get("/success", MPController.success)
mpRouter.get("/failure", MPController.failure)
mpRouter.get("/pending", MPController.pending)

export default mpRouter
