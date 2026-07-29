const express = require("express");
const {
  getUserPurchases,
  getAllPurchases,
  getReceipt,
} = require("../controllers/purchaseController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/me", protect, getUserPurchases);

router.get("/", protect, adminOnly, getAllPurchases);

router.get("/:id", protect, adminOnly, require("../controllers/purchaseController").getPurchase);
router.get("/:id/receipt", protect, getReceipt);
router.put("/:id/confirm", protect, adminOnly, require("../controllers/purchaseController").confirmPurchase);

module.exports = router;
