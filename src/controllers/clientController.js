import { clientModel } from '../models/clientModel.js'
import validator from 'validator'

export const clientController = {
  listAll: (req, res) => {
    const clients = clientModel.findAll()
    res.status(200).json(clients)
  },

  getById: (req, res) => {
    const { id } = req.params
    const client = clientModel.findById(id)

    if (!client) {
      return res.status(404).json({ message: "Error: Client not found." })
    }
    res.status(200).json(client)
  },

  create: (req, res) => {
    const { name, email, phone, address, zipCode } = req.body

    //validação dos campos obrigatórios 
    if (!name || !phone || !address || !zipCode) {
      return res.status(400).json({ message: "Error: Name, phone, address and zipCode are required fields." })
    }

    //validação do nome
    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({ message: "Error: name must be a string." });
    }

    // validação de email
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Error: Invalid email." });
    }

    //validação de telefone
    if (phone && !validator.isMobilePhone(phone, 'pt-BR')) {
      return res.status(400).json({ message: "Error: Invalid phone." });
    }

    // validação do cep
    if (zipCode && !validator.isPostalCode(zipCode, 'BR')) {
      return res.status(400).json({ message: "Error: Invalid Zip Code." });
    }

    const newClient = clientModel.create({ name, email, phone, address, zipCode });
    res.status(201).json(newClient)
  },

  //Atualizar dados a partir do id
  update: (req, res) => {
    const { id } = req.params
    const updateData = req.body // Pega tudo que vier no corpo da requisição

    // verificam se a requisição não está vazia
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Error: No data provided for update." })
    }
    //validação do nome
    if (updateData.name !== undefined && typeof updateData.name !== 'string') {
      return res.status(400).json({ message: "Error: name must be a string." });
    }

    // validação de email
    if (updateData.email && !validator.isEmail(updateData.email)) {
      return res.status(400).json({ message: "Error: Invalid email." });
    }

    //validação de telefone
    if (updateData.phone && !validator.isMobilePhone(updateData.phone, 'pt-BR')) {
      return res.status(400).json({ message: "Error: Invalid phone." });
    }

    // validação do cep
    if (updateData.zipCode && !validator.isPostalCode(updateData.zipCode, 'BR')) {
      return res.status(400).json({ message: "Error: Invalid Zip Code." });
    }
    
    // chama o model passando apenas o que o cliente enviou
    const updatedClient = clientModel.update(id, updateData)

    if (!updatedClient) {
      return res.status(404).json({ message: "Error: Client not found." })
    }

    return res.status(200).json(updatedClient)
  },

  delete: (req, res) => {
    const { id } = req.params
    const deleted = clientModel.delete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Error: Client not found." })
    } else { }
    res.status(200).json({ message: "Success: Client deleted." })
  }
}