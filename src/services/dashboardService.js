const Quote = require("../models/quotes");
const Client = require("../models/client");

const getDashboardStats = async () => {
  try {
    const totalQuotes = await Quote.countDocuments();

    const pendingQuotes = await Quote.countDocuments({ status: "PENDING" });
    const soldQuotes = await Quote.countDocuments({ status: "SOLD" });

    const totalRevenue = await Quote.aggregate([
      { $match: { status: "SOLD" } },
      { $group: { _id: null, total: { $sum: "$totalQuote" } } },
    ]);

    const totalProfitFromSoldQuotes = await Quote.aggregate([
      { $match: { status: "SOLD" } },
      { $unwind: "$quotedRepuestos" },
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$quotedRepuestos.gananciaTotal" },
        },
      },
    ]);

    const totalClients = await Client.countDocuments();

    return {
      totalQuotes,
      pendingQuotes,
      soldQuotes,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      totalProfitFromSoldQuotes:
        totalProfitFromSoldQuotes.length > 0
          ? totalProfitFromSoldQuotes[0].totalProfit
          : 0,
      totalClients,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Error fetching dashboard stats");
  }
};

module.exports = { getDashboardStats };
