import { Router } from 'express'
import { clientController } from '../controllers/clientController.js'

const router = Router()

//Lista todos os clientes
router.get('/', clientController.listAll)

export default router