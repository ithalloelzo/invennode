import {clientModel} from '../models/clientModel.js'

export const clientController = {
    listAll: (req, res) => {
        const clients = clientModel.findAll()
        res.status(200).json(clients)
      },
}