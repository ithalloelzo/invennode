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
              return res.status(404).json({ message: "Error: Product not found." })
            }
            res.status(200).json(product)
          },
          create: (req, res) => {
    const { name, price, quantity } = req.body;

    //verifica se os campos obrigatórios existem
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ 
        message: "Error: name, price, and quantity are mandatory fields." 
      });
    }

    //validação de preço, pois precisa ser um número 
    if (typeof price !== 'number') {
      return res.status(400).json({ message: "Error: price must be a number." })
    }

    //validação de tipo para quantidade, pois precisa ser um número INTEIRO
    if (!Number.isInteger(quantity)) {
      return res.status(400).json({ message: "Error: quantity must be an integer." })
    }

    const newProduct = productModel.create({ name, price, quantity })

    return res.status(201).json(newProduct)
  },

  update: (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    //validação de nome
    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({ message: "Error: name must be a string." });
    }
    //validação de preço
    if (price !== undefined && typeof price !== 'number') {
      return res.status(400).json({ message: "Error: price must be a number." });
    }
    //validação de quantidade
    if (quantity !== undefined && !Number.isInteger(quantity)) {
      return res.status(400).json({ message: "Error: quantity must be an integer." });
    }

    const updatedProduct = productModel.update(id, { name, price, quantity });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Error: Product not found." });
    }

    return res.status(200).json(updatedProduct);
  }
}