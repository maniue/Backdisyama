const Quotes = require("../models/quotes");
const Repuestos = require("../models/repuestos");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createQuote = async (quoteData) => {
  const newQuote = new Quotes(quoteData);
  return await newQuote.save();
};

const getAllQuotes = async () => {
  return await Quotes.find();
};

const getQuoteById = async (id) => {
  try {
    const quote = await Quotes.findById(id);
    return quote;
  } catch (error) {
    throw new Error("Error fetching quote by id");
  }
};

const updateQuote = async (id, quoteData) => {
  return await Quotes.findByIdAndUpdate(id, quoteData, { new: true });
};

const deleteQuote = async (id) => {
  return await Quotes.findByIdAndDelete(id);
};

const updateQuotedRepuestoById = async (
  quoteId,
  repuestoId,
  updatedRepuesto
) => {
  try {
    // Convertir repuestoId a ObjectId
    const repuestoObjectId = new mongoose.Types.ObjectId(repuestoId);

    // Buscar el documento Quotes por su _id
    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      throw new Error("Quote not found");
    }

    // Buscar el subdocumento repuesto dentro de quotedRepuestos por repuestoId
    const repuestoIndex = quote.quotedRepuestos.findIndex(
      (item) => item.repuestoId.toString() === repuestoObjectId.toString()
    );

    if (repuestoIndex === -1) {
      throw new Error("Repuesto not found in quotedRepuestos");
    }

    // Actualizar el subdocumento repuesto en quotedRepuestos
    quote.quotedRepuestos[repuestoIndex] = {
      ...quote.quotedRepuestos[repuestoIndex],
      ...updatedRepuesto,
    };

    // Guardar los cambios en el documento Quotes
    await quote.save();
    return quote;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addRepuestoIfNotExists = async (quoteId, newRepuesto) => {
  try {
    // Buscar la cotización por su _id
    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      throw new Error("Quote not found");
    }

    // Buscar el repuesto en el modelo Repuestos por su _id
    const repuesto = await Repuestos.findById(
      new ObjectId(newRepuesto.repuestoId)
    );
    if (!repuesto) {
      throw new Error("Repuesto not found");
    }
    if (repuesto.cantidad < newRepuesto.cantidad) {
      throw new Error("No existe inventario para la cantidad ingresada");
    }

    const repuestoExists = quote.quotedRepuestos.some(
      (item) =>
        item.repuestoId &&
        item.repuestoId.toString() === newRepuesto.repuestoId.toString()
    );

    if (repuestoExists) {
      throw new Error("Repuesto ya existe en la cotización");
    }

    quote.quotedRepuestos.push({
      repuestoId: new ObjectId(newRepuesto.repuestoId),
      cantidad: newRepuesto.cantidad,
      nombreRepuesto: newRepuesto.nombreRepuesto,
      precioUnitarioLempira: newRepuesto.precioUnitarioLempira,
      precioUnitarioDolar: newRepuesto.precioUnitarioDolar,
      porcentajeGanancia: newRepuesto.porcentajeGanancia,
      ganancia: newRepuesto.ganancia,
      gananciaTotal: newRepuesto.gananciaTotal,
      total: newRepuesto.total,
      brand: newRepuesto.brand,
    });

    const subtotal = quote.quotedRepuestos.reduce(
      (acc, repuesto) => acc + repuesto.total,
      0
    );

    const isv = subtotal * 0.15;

    const totalQuote = subtotal + isv;
    quote.subTotal = subtotal;
    quote.isv = isv;
    quote.totalQuote = totalQuote;

    await quote.save();

    return quote;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteQuotedRepuesto = async (quoteId, quotedRepuestoId) => {
  try {
    const quote = await Quotes.findById(quoteId);

    if (!quote) {
      throw new Error("Quote not found");
    }

    const updatedQuotedRepuestos = quote.quotedRepuestos.filter(
      (repuesto) => repuesto._id.toString() !== quotedRepuestoId
    );

    quote.quotedRepuestos = updatedQuotedRepuestos;

    const subtotal = updatedQuotedRepuestos.reduce((total, repuesto) => {
      return total + repuesto.total;
    }, 0);

    const isv = subtotal * 0.15;

    const totalQuote = subtotal + isv;

    quote.subTotal = subtotal;
    quote.isv = isv;
    quote.totalQuote = totalQuote;

    await quote.save();

    return quote;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changeQuoteStatus = async (quoteId, status) => {
  try {
    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      throw new Error("Quote not found");
    }

    if (status === "SOLD") {
      for (let repuesto of quote.quotedRepuestos) {
        const repuestoInInventory = await Repuestos.findById(
          repuesto.repuestoId
        );
        if (!repuestoInInventory) {
          throw new Error(
            `Repuesto ${repuesto.nombreRepuesto} no encontrado en inventario`
          );
        }

        if (repuestoInInventory.cantidad >= repuesto.cantidad) {
          repuestoInInventory.cantidad -= repuesto.cantidad;
          await repuestoInInventory.save();
        } else {
          throw new Error(
            `No hay suficiente inventario para el repuesto ${repuesto.nombreRepuesto}`
          );
        }
      }
    }

    quote.status = status;
    await quote.save();

    return quote;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDiscount = async (quoteId, descuentoPorcentaje) => {
  const quote = await Quotes.findById(quoteId);

  if (!quote) {
    return null;
  }

  quote.descuentoPorcentaje = descuentoPorcentaje;
  const discountAmount = (quote.totalQuote * descuentoPorcentaje) / 100;
  quote.totalConDescuento = parseFloat(
    (quote.totalQuote - discountAmount).toFixed(2)
  );

  quote.updatedAt = new Date();

  const updatedQuote = await quote.save();

  return updatedQuote;
};


module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
  updateQuotedRepuestoById,
  addRepuestoIfNotExists,
  deleteQuotedRepuesto,
  changeQuoteStatus,
  updateDiscount,
};
