import { Router } from 'express'
import { clientController } from '../controllers/clientController.js'

const router = Router()

//Lista todos os clientes
router.get('/', clientController.listAll)
//listar clientes por id
router.get('/:id', clientController.getById)
//criar um novo registro de cliente
router.post('/', clientController.create)
//atualizar registro de cliente
router.patch('/:id', clientController.update)
//deletar registro de cliente
router.delete('/:id', clientController.delete)

export default router