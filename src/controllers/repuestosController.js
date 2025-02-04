const repuestosService = require("../services/repuestosService");

const createRepuesto = async (req, res) => {
  try {
    const {
      numOrden,
      category,
      nombreRepuesto,
      brand,
      fabricante,
      cantidadTienda,
      cantidadBodega,
      cantidad,
    } = req.body;

    const tienda = Number(cantidadTienda);
    const bodega = Number(cantidadBodega);
    const total = Number(cantidad);

    const existingRepuesto = await repuestosService.getRepuestoByDetails({
      numOrden,
      category,
      nombreRepuesto,
      brand,
      fabricante,
    });

    if (existingRepuesto) {
      return res.status(400).json({
        message: `Ya existe un repuesto con los mismos valores (numOrden: '${numOrden}', category: '${category}', nombreRepuesto: '${nombreRepuesto}', brand: '${brand}', fabricante: '${fabricante}'). No se puede crear un nuevo repuesto con estos datos.`,
      });
    }

    if (tienda + bodega !== total) {
      return res.status(400).json({
        message: `La suma de cantidad en tienda (${tienda}) y cantidad en bodega (${bodega}) debe ser igual a la cantidad total (${total}). Actualmente es ${
          tienda + bodega
        }.`,
      });
    }

    const repuestoData = req.body;
    console.log(req.body);

    const newRepuesto = await repuestosService.createRepuesto(repuestoData);
    res.status(201).json(newRepuesto);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creando el repuesto", error: error.message });
  }
};

const getAllRepuestos = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const repuestos = await repuestosService.getAllRepuestos(filter);

    if (repuestos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron repuestos para esta categoría." });
    }

    res.status(200).json(repuestos);
  } catch (error) {
    console.error("Error al obtener los repuestos:", error);
    res
      .status(500)
      .json({ message: "Error fetching repuestos", error: error.message });
  }
};

const getRepuestoById = async (req, res) => {
  try {
    const { id } = req.params;
    const repuesto = await repuestosService.getRepuestoById(id);
    if (!repuesto) {
      return res.status(404).json({ message: "Repuesto not found" });
    }
    res.status(200).json(repuesto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching repuesto", error: error.message });
  }
};

const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedRepuesto = await repuestosService.updateRepuesto(
      id,
      updatedData
    );
    if (!updatedRepuesto) {
      return res.status(404).json({ message: "Repuesto not found" });
    }
    res.status(200).json(updatedRepuesto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating repuesto", error: error.message });
  }
};

const deleteRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRepuesto = await repuestosService.deleteRepuesto(id);
    if (!deletedRepuesto) {
      return res.status(404).json({ message: "Repuesto not found" });
    }
    res.status(200).json({ message: "Repuesto deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting repuesto", error: error.message });
  }
};

module.exports = {
  createRepuesto,
  getAllRepuestos,
  getRepuestoById,
  updateRepuesto,
  deleteRepuesto,
};
