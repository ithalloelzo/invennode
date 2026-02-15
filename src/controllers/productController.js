import { productModel } from "../models/productModel.js"

export const productController = {
    listAll: (req, res) => {
            const products = productModel.findAll()
            res.status(200).json(products)
          },
    
        getById: (req, res) => {
            const { id } = req.params
            const product = productModel.findById(id)
            
            if (!product) {
              return res.status(404).json({ message: "Product not found." })
            }
            res.status(200).json(product)
          },
}