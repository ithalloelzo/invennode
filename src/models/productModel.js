import { products } from '../data/products.js'
import crypto from 'node:crypto'

export const productModel = {
    findAll:() => {
        return products
    },
    findById: (id) => {
        return products.find(product => product.id === id )
    },
    create: (productData) => {
        const newProduct = {
          id: crypto.randomUUID(), 
          ...productData
        };
        products.push(newProduct)
        return newProduct
      },
    update: (id, updateData) => {
            const index = products.findIndex(product => product.id === id)
            if (index !== -1) {
              // separar o 'id' do updateData 
              // para o id não ser alterado
              const { id: _, ...safeData } = updateData 
        
              //juntar o objeto original apenas com os dados seguros
              products[index] = { ...products[index], ...safeData }
              return products[index]
            }
            return null
          },

}