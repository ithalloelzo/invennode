import crypto from 'node:crypto'
import { clients } from '../data/clients.js'

export const clientModel = {
  findAll: () => { //listar todos os clientes
    return clients
  },

  findById: (id) => { //buscar cliente por id
    return clients.find(client => client.id === id)
  },

  create: (clientData) => { //cadastrar cliente
    const newClient = {
      id: crypto.randomUUID(),
      ...clientData
    };
    clients.push(newClient)
    return newClient
  },

  update: (id, updateData) => {
    const index = clients.findIndex(client => client.id === id)
    if (index !== -1) {
      // separar o 'id' do updateData 
      // para o id não ser alterado
      const { id: _, ...safeData } = updateData

      //juntar o objeto original apenas com os dados seguros
      clients[index] = { ...clients[index], ...safeData }
      return clients[index]
    }
    return null
  },

  delete: (id) => {
    const index = clients.findIndex(client => client.id === id)
    if (index !== -1) {
      const deleted = clients.splice(index, 1);
      return deleted
    }
    return null
  }
}