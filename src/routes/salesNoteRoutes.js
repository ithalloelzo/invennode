import { Router } from 'express'
import { salesNoteController } from '../controllers/salesNoteController.js'

const router = Router()

//precisa de alguns ajustes
router.post('/', salesNoteController.create)
//listar todas as notas
router.get('/', salesNoteController.findAll)
//listar nota por id
router.get("/:id", salesNoteController.findById)
//ainda precisa de ajustes
router.patch('/:id', salesNoteController.update)
//deletar nota
router.delete('/:id', salesNoteController.delete)

export default router