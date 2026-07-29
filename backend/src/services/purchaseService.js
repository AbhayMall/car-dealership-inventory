const Purchase = require("../models/Purchase");
const Vehicle = require("../models/Vehicle");

const createPurchase = async (user, vehicleId, buyerInfo) => {
  const { age, phone, aadhar, location, drivingLicense, paymentMethod, buyerName } = buyerInfo;

  if (!age || Number(age) < 21) {
    const err = new Error("Buyer must be at least 21 years old to purchase a vehicle.");
    err.status = 400;
    throw err;
  }

  // decrement stock atomically
  const vehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId, quantity: { $gt: 0 } },
    { $inc: { quantity: -1 } },
    { new: true }
  );

  if (!vehicle) {
    const err = new Error("Vehicle not available or out of stock");
    err.status = 400;
    throw err;
  }

  const purchase = await Purchase.create({
    vehicle: vehicleId,
    user: user?._id,
    buyerName: buyerName || (user && user.name) || "",
    phone,
    aadhar,
    location,
    age: Number(age),
    drivingLicense,
    paymentMethod,
    paymentConfirmed: paymentMethod !== "cash",
  });

  return { vehicle, purchase };
};

const getPurchasesForUser = async (userId) => {
  return await Purchase.find({ user: userId }).populate("vehicle").sort({ createdAt: -1 });
};

const getAllPurchases = async () => {
  return await Purchase.find().populate("vehicle user").sort({ createdAt: -1 });
};

const getPurchaseById = async (id) => {
  return await Purchase.findById(id).populate("vehicle user");
};

const confirmPurchasePayment = async (id) => {
  const p = await Purchase.findById(id);
  if (!p) {
    const err = new Error("Purchase not found");
    err.status = 404;
    throw err;
  }
  p.paymentConfirmed = true;
  await p.save();
  return await getPurchaseById(id);
};

module.exports = {
  createPurchase,
  getPurchasesForUser,
  getAllPurchases,
  getPurchaseById,
  confirmPurchasePayment,
};
