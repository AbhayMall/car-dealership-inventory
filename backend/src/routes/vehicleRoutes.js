const express = require("express");

const {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle
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