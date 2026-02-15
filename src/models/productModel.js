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

}