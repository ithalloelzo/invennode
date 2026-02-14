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

    //Atualizar dados a partir do id
    update: (req, res) => {
      const { id } = req.params
      const updateData = req.body // Pega tudo que vier no corpo da requisição

  // verificam se a requisição não está vazia
      if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update." })
      }

  // chama o model passando apenas o que o cliente enviou
     const updatedClient = clientModel.update(id, updateData)

     if (!updatedClient) {
       return res.status(404).json({ message: "Client not found." })
    }

    return res.status(200).json(updatedClient)
},
     
}