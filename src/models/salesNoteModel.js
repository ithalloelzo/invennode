import crypto from 'node:crypto'
import { salesNotes } from '../data/salesNotes.js'
import { senders } from '../data/senders.js'
import { clients } from '../data/clients.js'
import { products as productsDb } from '../data/products.js'

export const salesNoteModel = {
    
  findAll: () => salesNotes,

  findById: (id) => salesNotes.find(note => note.id === id),

  create: (data) => {
    const { id_client, id_sender, products: itemsRequested, methodPayment, status } = data

    // O cliente deve existir
    const clientExists = clients.find(c => c.id === id_client)
    if (!clientExists) return { error: "Error: Client not found" }

    //O remetente deve existir
    const senderExists = senders.find(s => s.id === id_sender)
    if (!senderExists) return { error: "Error: Sender not found" }

    //processamento de Produtos e Cálculo de Valor Total
    let valueTotal = 0;
    const enrichedProducts = itemsRequested.map(item => {
      const productInfo = productsDb.find(p => p.id === item.productId)
      
      if (productInfo) {
        const subtotal = productInfo.price * item.quantity
        valueTotal += subtotal;
        
        return {
          id: productInfo.id,
          name: productInfo.name,
          price: productInfo.price,
          quantity: item.quantity
        };
      }
      return null;
    }).filter(p => p !== null) // Remove itens inválidos

    if (enrichedProducts.length === 0) return { error: "No valid products found" }

    //criação da Nota com UUID e Data formatada 
    const newSalesNote = {
      id: crypto.randomUUID(),
      id_client,
      id_sender,
      products: enrichedProducts,
      status: status || "waiting",
      methodPayment,
      date: new Date().toLocaleDateString('pt-BR'), //data formatada pra o padrão br
      valueTotal: Number(valueTotal.toFixed(2))
    };

    salesNotes.push(newSalesNote)
    return newSalesNote
  },

  update: (id, updateData) => {
    const index = salesNotes.findIndex(note => note.id === id)
    if (index === -1) return null
  
    // atualização Parcial, não sobrescreve o id original 
    salesNotes[index] = { ...salesNotes[index], ...updateData, id: salesNotes[index].id }
    return salesNotes[index];
  },

  delete: (id) => {
    const index = salesNotes.findIndex(note => note.id === id)
    if (index !== -1) return salesNotes.splice(index, 1)
    return null
  }
}
