const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Purchase = require("../models/Purchase");

const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalVehicles, pendingPurchases] = await Promise.all([
      User.countDocuments(),
      Vehicle.countDocuments(),
      Purchase.countDocuments({ paymentConfirmed: false }),
    ]);

    res.status(200).json({
      totalUsers,
      totalVehicles,
      pendingPurchases,
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
