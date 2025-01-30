const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
  client: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true }, 
  phoneNumber: { type: String, required: true },
  status: {type: String, default: 'PENDING'},
  rtn: { type: String, required: true },
  location: { type: String, required: true },
  subTotal: { 
    type: Number, 
    default: 0,
    set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
  },
  isv: { 
    type: Number, 
    default: 0,
    set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
  },
  totalQuote: { 
    type: Number, 
    default: 0,
    set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
  },
  quotedRepuestos: [
    {
      repuestoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repuestos'},
      cantidad: { type: Number },
      nombreRepuesto: { type: String },
      precioUnitarioLempira: { 
        type: Number, 
        set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
      },
      precioUnitarioDolar: { 
        type: Number
      },
      porcentajeGanancia: { 
        type: Number, 
        set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
      },
      ganancia: { 
        type: Number, 
        set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
      },
      gananciaTotal: { 
        type: Number, 
        set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
      },
      total: { 
        type: Number,
        set: value => parseFloat(value.toFixed(2))  // Redondear a 2 decimales
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quotes', quotesSchema);
