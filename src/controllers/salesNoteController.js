import { salesNoteModel } from '../models/salesNoteModel.js'

export const salesNoteController = {
  create: (req, res) => {
  const { id_client, id_sender, products, methodPayment, status } = req.body

  //metodo de pagamento obrigatório
  if (!methodPayment) {
    return res.status(400).json({ message: "Error: methodPayment is required." })
  }
  //guarda as opções permitidas
  const validMethods = ['pix', 'debit', 'credit', 'cash']
  //só permitir (pix, debit, credit, cash)
  if (!validMethods.includes(methodPayment)) {
    return res.status(400).json({ 
      message: `Error: Invalid payment method. Choose between: ${validMethods.join(', ')}.` 
    })
  }

  // torna o status obrigatório ser informado 
  if (!status) {
    return res.status(400).json({ message: "Error: status is required." })
  }
  //só permitir esses status
  const validStatus = ['canceled', 'waiting', 'paid']

  //restringer aos valores 
  if (!validStatus.includes(status)) {
    return res.status(400).json({ 
      message: `Error: Invalid status. Permitted values: ${validStatus.join(', ')}.` 
    })
  }



    // O Model processará a busca de preços e o cálculo do totalValue
    const newNote = salesNoteModel.create({ 
      id_client, 
      id_sender, 
      products, 
      methodPayment, 
      status 
    });

    if (newNote.error) {
      return res.status(400).json({ message: `Error: ${newNote.error}` });
    }

    return res.status(201).json(newNote);
  },

  findAll: (req, res) => {
    const notes = salesNoteModel.findAll();
    return res.status(200).json(notes);
  },

  findById: (req, res) => {
    const { id } = req.params;
    const note = salesNoteModel.findById(id)

    if (!note) {
      return res.status(404).json({ message: "Sales Note not found." })
    }

    return res.status(200).json(note);
  },

  // UPDATE (Lógica de PATCH para manter integridade) 
  update: (req, res) => {
    const { id } = req.params;
    const updatedNote = salesNoteModel.update(id, req.body)

    //validação do status (executa apenas se enviado)
    if (updatedNote.status) {
        const validStatus = ['canceled', 'waiting', 'paid'];
        if (!validStatus.includes(updatedNote.status)) {
            return res.status(400).json({ 
                message: `Error: Invalid status. Allowed: ${validStatus.join(', ')}.` 
            });
        }
    }
    
     //validação do methodPayment (executa apenas se enviado)
    if (updatedNote.methodPayment) {
        const validMethods = ['pix', 'debit', 'credit', 'cash'];
        if (!validMethods.includes(updatedNote.methodPayment)) {
            return res.status(400).json({ 
                message: `Error: Invalid payment method. Allowed: ${validMethods.join(', ')}.` 
            });
        }
    }

    

    if (!updatedNote) {
      return res.status(404).json({ message: "Error: Update failed. Note not found." });
    }

    return res.status(200).json(updatedNote);
  },

  // DELETE
  delete: (req, res) => {
    const { id } = req.params;
    const deleted = salesNoteModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Error: Could not delete. Note not found." });
    }

    return res.status(200).json({message: "Success: sale note deleted."}); // No Content
  }
}