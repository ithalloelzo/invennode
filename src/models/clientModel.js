import crypto from 'node:crypto'
import {clients} from '../data/clients.js'

export const clientModel = {
    findAll: () =>{ //listar todos os clientes
        return clients 
    },

  findById: (id) => { //buscar cliente por id
    return clients.find(client => client.id === id)
  },

  create: (clientData) => {
      const newClient = {
        id: crypto.randomUUID(), 
        ...clientData
      };
      clients.push(newClient)
      return newClient
    },
}