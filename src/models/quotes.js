const mongoose = require("mongoose");

const quotesSchema = new mongoose.Schema({
  client: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, default: "PENDING" },
  rtn: { type: String, required: true },
  location: { type: String, required: true },
  subTotal: {
    type: Number,
    default: 0,
    set: (value) => parseFloat(value.toFixed(2)),
  },
  isv: {
    type: Number,
    default: 0,
    set: (value) => parseFloat(value.toFixed(2)),
  },
  totalQuote: {
    type: Number,
    default: 0,
    set: (value) => parseFloat(value.toFixed(2)),
  },
  descuentoPorcentaje: { type: Number, default: 0 },
  totalConDescuento: { type: Number, default: 0 },
  quotedRepuestos: [
    {
      repuestoId: { type: mongoose.Schema.Types.ObjectId, ref: "Repuestos" },
      cantidad: { type: Number },
      nombreRepuesto: { type: String },
      brand: { type: String },
      precioUnitarioLempira: {
        type: Number,
        set: (value) => parseFloat(value.toFixed(2)),
      },
      precioUnitarioDolar: {
        type: Number,
      },
      porcentajeGanancia: {
        type: Number,
        set: (value) => parseFloat(value.toFixed(2)),
      },
      ganancia: {
        type: Number,
        set: (value) => parseFloat(value.toFixed(2)),
      },
      gananciaTotal: {
        type: Number,
        set: (value) => parseFloat(value.toFixed(2)),
      },
      total: {
        type: Number,
        set: (value) => parseFloat(value.toFixed(2)),
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quotes", quotesSchema);
