const mongoose = require('mongoose');

const repuestosSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  code: { type: String, required: true },
  mercedes: { type: String, required: true },
  nombreRepuesto: { type: String, required: true },
  fabricante: { type: String, required: true },
  caracteristicaHn: { type: String, required: true },
  buses: { type: String, required: true },
  costoUndDolar: { type: Number, required: true },
  costoUndLempira: { type: Number, required: true },
  category: { type: String, required: true },
  cantidad: { type: Number, required: true },
  cantidadTienda: {type: Number, required: true},
  cantidadBodega: {type: Number},
  orrden: [
    {
      numOrden: {type: String, required: true},
      cantidadInicial: { type: Number, required: true },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Repuestos', repuestosSchema);
