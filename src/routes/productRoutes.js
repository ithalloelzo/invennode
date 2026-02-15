import { Router } from "express"
import { productController } from "../controllers/productController.js"

const router = Router()

//listar produto especifico
router.get('/:id', productController.getById)

//listar todos os produtos
router.get('/', productController.listAll)

//criar produtos
router.post('/', productController.create)

//atualizar produtos
router.patch('/:id', productController.update)

//deletar produtos
router.delete('/:id', productController.delete)



export default router