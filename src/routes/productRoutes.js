import { Router } from "express"
import { productController } from "../controllers/productController.js"

const router = Router()

//listar produto especifico
router.get('/:id', productController.getById)

//listar todos os produtos
router.get('/', productController.listAll)

export default router