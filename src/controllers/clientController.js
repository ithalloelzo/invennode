import {clientModel} from '../models/clientModel.js'

export const clientController = {
    listAll: (req, res) => {
        const clients = clientModel.findAll()
        res.status(200).json(clients)
      },

    getById: (req, res) => {
        const { id } = req.params
        const client = clientModel.findById(id)
        
        if (!client) {
          return res.status(404).json({ message: "Client not found." })
        }
        res.status(200).json(client)
      },

    create: (req, res) => {
        const { name, email, phone, address, zipCode } = req.body
        
        // Validação dos campos obrigatórios 
        if (!name || !phone || !address || !zipCode) {
          return res.status(400).json({ message: "Name, phone, address and zipCode are required fields." })
        }
    
        const newClient = clientModel.create({ name, email, phone, address, zipCode});
        res.status(201).json(newClient)
      },
}