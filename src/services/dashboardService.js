const Quote = require("../models/quotes");
const Client = require("../models/client");

const getDashboardStats = async () => {
  try {
    // Contar el total de registros en Quote
    const totalQuotes = await Quote.countDocuments();

    // Contar cotizaciones por estado
    const pendingQuotes = await Quote.countDocuments({ status: "PENDING" });
    const soldQuotes = await Quote.countDocuments({ status: "SOLD" });

    // Sumar todos los valores de totalQuote
    const totalRevenue = await Quote.aggregate([
        { $match: { status: "SOLD" } }, // Filtrar solo las vendidas
      { $group: { _id: null, total: { $sum: "$totalQuote" } } },
    ]);

    // Sumar todas las ganancias de repuestos en cotizaciones con status 'SOLD'
    const totalProfitFromSoldQuotes = await Quote.aggregate([
      { $match: { status: "SOLD" } }, // Filtrar solo las vendidas
      { $unwind: "$quotedRepuestos" }, // Desglosar los repuestos dentro de cada cotización
      { $group: { _id: null, totalProfit: { $sum: "$quotedRepuestos.gananciaTotal" } } },
    ]);

    // Contar total de clientes en Client
    const totalClients = await Client.countDocuments();

    return {
      totalQuotes,
      pendingQuotes,
      soldQuotes,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      totalProfitFromSoldQuotes: totalProfitFromSoldQuotes.length > 0 ? totalProfitFromSoldQuotes[0].totalProfit : 0,
      totalClients,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Error fetching dashboard stats");
  }
};

module.exports = { getDashboardStats };
