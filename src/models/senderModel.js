import crypto from 'node:crypto' // gerar id unicos
import { senders } from '../data/senders.js'

export const senderModel = {
  //Listar todos os remetentes
  findAll: () => {
    return senders
  },

  // Buscar por ID 
  findById: (id) => {
    return senders.find(sender => sender.id === id)
  },

  // Criar novo remetente com UUID
  create: (senderData) => {
    const newSender = {
      id: crypto.randomUUID(), // Gera um ID único
      ...senderData
    };
    senders.push(newSender)
    return newSender
  },

  // Atualização de campos
 update: (id, updateData) => {
    const index = senders.findIndex(sender => sender.id === id)
    if (index !== -1) {
      // separar o 'id' do updateData 
      // para o id não ser alterado
      const { id: _, ...safeData } = updateData 

      //juntar o objeto original apenas com os dados seguros
      senders[index] = { ...senders[index], ...safeData }
      return senders[index]
    }
    return null
  },

  //Remover remetente
  delete: (id) => {
    const index = senders.findIndex(sender => sender.id === id)
    if (index !== -1) {
      const deleted = senders.splice(index, 1);
      return deleted
    }
    return null
  }
};