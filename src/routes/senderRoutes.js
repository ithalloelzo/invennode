import { Router } from 'express'
import { senderController } from '../controllers/senderController.js'

const router = Router() //permite a criação de rotas no express

//listar todos os remetentes 
router.get('/', senderController.listAll)

//buscar um remetente específico por ID
router.get('/:id', senderController.getById)

//criar um novo remetente 
router.post('/', senderController.create)

//atualizar os dados de um remetente 
router.put('/:id', senderController.update)

//deletar um remetente do sistema 
router.delete('/:id', senderController.delete)

export default router