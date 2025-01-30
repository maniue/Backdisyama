const repuestosService = require("../services/repuestosService")

const createRepuesto = async (req, res) => {
  
  try {
    const { numOrden, category, nombreRepuesto, brand, fabricante, cantidadTienda, cantidadBodega, cantidad } = req.body;

    // Convertir los valores a números para evitar concatenación de cadenas
    const tienda = Number(cantidadTienda);
    const bodega = Number(cantidadBodega);
    const total = Number(cantidad);

    // Verificar si ya existe un repuesto con los mismos valores (numOrden, category, nombreRepuesto, brand, fabricante)
    const existingRepuesto = await repuestosService.getRepuestoByDetails({ numOrden, category, nombreRepuesto, brand, fabricante });

    if (existingRepuesto) {
      return res.status(400).json({
        message: `Ya existe un repuesto con los mismos valores (numOrden: '${numOrden}', category: '${category}', nombreRepuesto: '${nombreRepuesto}', brand: '${brand}', fabricante: '${fabricante}'). No se puede crear un nuevo repuesto con estos datos.`,
      });
    }

    // Validar que la suma de tienda y bodega sea igual a la cantidad total
    if (tienda + bodega !== total) {
      return res.status(400).json({
        message: `La suma de cantidad en tienda (${tienda}) y cantidad en bodega (${bodega}) debe ser igual a la cantidad total (${total}). Actualmente es ${
          tienda + bodega
        }.`,
      });
    }

    // Si todo está correcto, procede a crear el repuesto
    const repuestoData = req.body;
    console.log(req.body); // Verifica que el campo `orrden[0].numOrden` existe y tiene valor

    const newRepuesto = await repuestosService.createRepuesto(repuestoData);
    res.status(201).json(newRepuesto);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creando el repuesto', error: error.message });
  }

};






const getAllRepuestos = async (req, res) => {
  try {
    const { category } = req.query;  // Obtenemos el parámetro category desde la URL

    let filter = {};
    if (category) {
      filter.category = category;  // Si se proporciona category, lo usamos para filtrar
    }

    const repuestos = await repuestosService.getAllRepuestos(filter);

    if (repuestos.length === 0) {
      // Si no se encontraron repuestos, devolver un mensaje de error específico
      return res.status(404).json({ message: 'No se encontraron repuestos para esta categoría.' });
    }

    res.status(200).json(repuestos);
  } catch (error) {
    console.error('Error al obtener los repuestos:', error);
    res.status(500).json({ message: 'Error fetching repuestos', error: error.message });
  }
};




const getRepuestoById = async (req, res) => {
  try {
    const { id } = req.params;
    const repuesto = await repuestosService.getRepuestoById(id);
    if (!repuesto) {
      return res.status(404).json({ message: 'Repuesto not found' });
    }
    res.status(200).json(repuesto);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repuesto', error: error.message });
  }
};

const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedRepuesto = await repuestosService.updateRepuesto(id, updatedData);
    if (!updatedRepuesto) {
      return res.status(404).json({ message: 'Repuesto not found' });
    }
    res.status(200).json(updatedRepuesto);
  } catch (error) {
    res.status(500).json({ message: 'Error updating repuesto', error: error.message });
  }
};

const deleteRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRepuesto = await repuestosService.deleteRepuesto(id);
    if (!deletedRepuesto) {
      return res.status(404).json({ message: 'Repuesto not found' });
    }
    res.status(200).json({ message: 'Repuesto deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting repuesto', error: error.message });
  }
};

module.exports = {
  createRepuesto,
  getAllRepuestos,
  getRepuestoById,
  updateRepuesto,
  deleteRepuesto,
};
