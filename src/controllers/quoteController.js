const Quotes = require('../models/quotes')
const quotesService = require('../services/quotesService')
const Repuestos = require('../models/repuestos')

const createQuote = async (req, res) => {
    try {
      const { client, companyName, email, phoneNumber, rtn, location, cantidadRepuestos, totalQuote, isv, subTotal, quotedRepuestos } = req.body;
  
      // Validar si quotedRepuestos existe y tiene datos
      if (quotedRepuestos && quotedRepuestos.length > 0) {
        // Check and update inventory
        for (let item of quotedRepuestos) {
          const repuesto = await Repuestos.findById(item.repuestoId);
  
          if (!repuesto || repuesto.cantidad < item.cantidad) {
            return res.status(400).send(`Insufficient inventory for repuesto: ${item.repuesto}`);
          }
          repuesto.cantidad -= item.cantidad;
          await repuesto.save();
        }
      }
  
      // Crear la nueva cotización
      const newQuote = new Quotes({ 
        client, 
        companyName, 
        email, 
        phoneNumber, 
        rtn, 
        isv,
        subTotal,
        location, 
        cantidadRepuestos, 
        totalQuote, 
        quotedRepuestos: quotedRepuestos || [] // Asignar un array vacío si no se envió quotedRepuestos
      });
      await newQuote.save();
  
      res.status(201).send(newQuote);
    } catch (error) {
      res.status(500).send({ message: error.message });
      console.log(error);
    }
  };
  

const getAllQuotes = async (req, res) => {
  try {
    const parts = await quotesService.getAllQuotes();
    res.status(200).send(parts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await quotesService.getQuoteById(quoteId);

    if (!quote) {
      return res.status(404).send({ message: 'Quote not found' });
    }

    res.status(200).send(quote);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateQuote = async (req, res) => {
  try {
    const part = await quotesService.updateQuote(req.params.id, req.body);
    if (!part) {
      return res.status(404).send({ message: 'Part not found' });
    }
    res.status(200).send(part);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const part = await quotesService.deleteQuote(req.params.id);
    if (!part) {
      return res.status(404).send({ message: 'Part not found' });
    }
    res.status(200).send({ message: 'Part deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateQuotedRepuesto = async (req, res) => {
    const { id, repuestoId } = req.params; // `id` es el _id del documento Quotes
    const updatedRepuesto = req.body; // Datos a actualizar en el subdocumento
  
    try {
      const updatedQuote = await quotesService.updateQuotedRepuestoById(id, repuestoId, updatedRepuesto);
      res.json(updatedQuote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const addRepuestoIfNotExists = async (req, res) => {
    const { quoteId } = req.params; // ID de la cotización
    const newRepuesto = req.body;  // El nuevo repuesto con todos los datos
  
    try {
      // Llamamos al servicio que maneja la lógica
      const updatedQuote = await quotesService.addRepuestoIfNotExists(quoteId, newRepuesto);
  
      // Si se actualiza correctamente, respondemos con la cotización actualizada
      return res.status(200).json({
        message: 'Repuesto agregado correctamente',
        quote: updatedQuote
      });
    } catch (error) {
      // Si hay un error, respondemos con un mensaje de error
      return res.status(400).json({
        message: error.message
      });
    }
  };
  
  const deleteQuotedRepuesto = async (req, res) => {
    const { quoteId, quotedRepuestoId } = req.params;
    try {
      // Llama al servicio para eliminar el repuesto del array quotedRepuestos
      const updatedQuote = await quotesService.deleteQuotedRepuesto(quoteId, quotedRepuestoId);
      res.status(200).json({
        message: 'Repuesto eliminado con éxito',
        quote: updatedQuote
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  };
  const updateQuoteStatus = async (req, res) => {
    const { quoteId } = req.params;
    const { status } = req.body; // El nuevo estado
  
    try {
      // Llamamos al servicio que maneja la lógica
      const updatedQuote = await quotesService.changeQuoteStatus(quoteId, status);
      
      // Respondemos con la cotización actualizada
      return res.status(200).json({
        message: 'Estado de la cotización actualizado correctamente',
        quote: updatedQuote,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  
module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
  updateQuotedRepuesto,
  addRepuestoIfNotExists,
  deleteQuotedRepuesto,
  updateQuoteStatus
};
