import { senderModel } from '../models/senderModel.js'
import validator from 'validator'

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
    //validação do nome
    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({ message: "Error: name must be a string." })
    }
    //validação do email
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Error: Invalid email." })
    }

    //validação de senha
    if (password !== undefined && typeof password !== 'string') {
      return res.status(400).json({ message: "Error: password must be a string." })
    }
    //comprimento de senha
    if (!password || password.length < 8) {
      return res.status(400).json({ 
        message: "Error: Password must be at least 8 characters long." 
      })
    }
    //a senha deve ter pelo menos um numero
     const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return res.status(400).json({ 
        message: "Error: Password must contain at least one number." 
      })
    }

    const newSender = senderModel.create({ name, email, password });
    res.status(201).json(newSender)
  },

  //Atualizar dados a partir do id
  update: (req, res) => {
    const { id } = req.params
    const updateData = req.body

    //avisar que não há nada na requisição
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update." })
    }
    //validação de nome
    if (updateData.name !== undefined && typeof updateData.name !== 'string') {
      return res.status(400).json({ message: "Error: name must be a string." })
    }
    //validação do email
    if (updateData.email && !validator.isEmail(updateData.email)) {
      return res.status(400).json({ message: "Error: Invalid email." })
    }

    //validação de senha
  if (updateData.password !== undefined) {
    // verificação de Tipo 
    if (typeof updateData.password !== 'string') {
      return res.status(400).json({ 
        message: "Error: Password must be a string." 
      })
    }

    // Verificação de Comprimento
    if (updateData.password.length < 8) {
      return res.status(400).json({ 
        message: "Error: Password must be at least 8 characters long." 
      })
    }

    //verificação de Complexidade
    const hasNumber = /\d/.test(updateData.password);
    if (!hasNumber) {
      return res.status(400).json({ 
        message: "Error: Password must contain at least one number." 
      });
    }
  }

    // Mandar pro Model apenas os campos autorizados
    const updatedSender = senderModel.update(id, updateData)

    if (!updatedSender) {
      return res.status(404).json({ message: "Error: Sender not found." })
    }
    return res.status(200).json(updatedSender)
  },

  //Remover um remetente a partir do Id
  delete: (req, res) => {
    const { id } = req.params
    const deleted = senderModel.delete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Error: Sender not found." })
    } else { }
    res.status(200).json({ message: "Success: sender deleted." })
  }
}