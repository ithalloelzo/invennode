import { senderModel } from '../models/senderModel.js'

export const senderController = {
  //listar todos os remetentes 
  listAll: (req, res) => {
    const senders = senderModel.findAll()
    res.status(200).json(senders)
  },

  //buscar um remetente por id
  getById: (req, res) => {
    const { id } = req.params
    const sender = senderModel.findById(id)
    
    if (!sender) {
      return res.status(404).json({ message: "Sender not found." })
    }
    res.status(200).json(sender)
  },

  //criar um novo remetente 
  create: (req, res) => {
    const { name, email, password } = req.body
    
    // Validação dos campos obrigatórios 
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required fields." })
    }

    const newSender = senderModel.create({ name, email, password });
    res.status(201).json(newSender)
  },

  //Atualizar dados a partir do id
  update: (req, res) => {
    const { id } = req.params
    const updateData = req.body

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update." })
    }
    // Mandar pro Model apenas os campos autorizados
    const updatedSender = senderModel.update(id, updateData)

    if (!updatedSender) {
      return res.status(404).json({ message: "Sender not found." })
    }
    return res.status(200).json(updatedSender)
  },

  //Remover um remetente a partir do Id
  delete: (req, res) => {
    const { id } = req.params
    const deleted = senderModel.delete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Error: Sender not found." })
    }else{}
     res.status(200).json({ message: "Success: sender deleted."}) 
  }
};