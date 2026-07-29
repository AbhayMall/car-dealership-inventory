const express = require("express");

const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    searchVehicles,
    purchaseVehicle,
    restockVehicle
} = require("../controllers/vehicleController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    createVehicle
);

router.get(
    "/",
    protect,
    getVehicles
);

router.get(
    "/search",
    protect,
    searchVehicles
);

router.get(
    "/:id",
    protect,
    getVehicleById
);

router.post(
    "/:id/purchase",
    protect,
    purchaseVehicle
);

router.post(
    "/:id/restock",
    protect,
    adminOnly,
    restockVehicle
);

router.put(
    "/:id",
    protect,
    updateVehicle
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteVehicle
);


module.exports = router;