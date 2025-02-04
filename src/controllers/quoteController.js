const Quotes = require("../models/quotes");
const quotesService = require("../services/quotesService");
const Repuestos = require("../models/repuestos");

const createQuote = async (req, res) => {
  try {
    const {
      client,
      companyName,
      email,
      phoneNumber,
      rtn,
      location,
      cantidadRepuestos,
      totalQuote,
      isv,
      subTotal,
      quotedRepuestos,
    } = req.body;
    if (quotedRepuestos && quotedRepuestos.length > 0) {
      for (let item of quotedRepuestos) {
        const repuesto = await Repuestos.findById(item.repuestoId);

        if (!repuesto || repuesto.cantidad < item.cantidad) {
          return res
            .status(400)
            .send(`Insufficient inventory for repuesto: ${item.repuesto}`);
        }
        repuesto.cantidad -= item.cantidad;
        await repuesto.save();
      }
    }
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
      quotedRepuestos: quotedRepuestos || [],
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
      return res.status(404).send({ message: "Quote not found" });
    }

    res.status(200).send(quote);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateQuote = async (req, res) => {
  console.log(req.body);

  try {
    const part = await quotesService.updateQuote(req.params.id, req.body);
    if (!part) {
      return res.status(404).send({ message: "Part not found" });
    }
    res.status(200).send(part);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

const deleteQuote = async (req, res) => {
  try {
    const part = await quotesService.deleteQuote(req.params.id);
    if (!part) {
      return res.status(404).send({ message: "Part not found" });
    }
    res.status(200).send({ message: "Part deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateQuotedRepuesto = async (req, res) => {
  const { id, repuestoId } = req.params;
  const updatedRepuesto = req.body;
  try {
    const updatedQuote = await quotesService.updateQuotedRepuestoById(
      id,
      repuestoId,
      updatedRepuesto
    );
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRepuestoIfNotExists = async (req, res) => {
  const { quoteId } = req.params;
  const newRepuesto = req.body;

  try {
    const updatedQuote = await quotesService.addRepuestoIfNotExists(
      quoteId,
      newRepuesto
    );
    return res.status(200).json({
      message: "Repuesto agregado correctamente",
      quote: updatedQuote,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteQuotedRepuesto = async (req, res) => {
  const { quoteId, quotedRepuestoId } = req.params;
  try {
    const updatedQuote = await quotesService.deleteQuotedRepuesto(
      quoteId,
      quotedRepuestoId
    );
    res.status(200).json({
      message: "Repuesto eliminado con éxito",
      quote: updatedQuote,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateQuoteStatus = async (req, res) => {
  const { quoteId } = req.params;
  const { status } = req.body;
  try {
    const updatedQuote = await quotesService.changeQuoteStatus(quoteId, status);
    return res.status(200).json({
      message: "Estado de la cotización actualizado correctamente",
      quote: updatedQuote,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
const updateDiscount = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { descuentoPorcentaje } = req.body;

    if (descuentoPorcentaje === undefined) {
      return res
        .status(400)
        .json({ message: "Descuento porcentaje es requerido." });
    }
    const updatedQuote = await quotesService.updateDiscount(
      quoteId,
      descuentoPorcentaje
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Cotización no encontrada." });
    }

    return res.status(200).json(updatedQuote);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el descuento." });
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
  updateQuoteStatus,
  updateDiscount,
};
