const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {
    return await Vehicle.create(vehicleData);
};

const getVehicles = async () => {
    return await Vehicle.find().sort({ createdAt: -1 });
};

const getVehicleById = async (id) => {
    return await Vehicle.findById(id);
};

const updateVehicle = async (id, vehicleData) => {

    return await Vehicle.findByIdAndUpdate(
        id,
        vehicleData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id);
};

const searchVehicles = async ({
    make,
    model,
    category,
    minPrice,
    maxPrice
}) => {

    const query = {};

    if (make) {
        query.make = {
            $regex: make,
            $options: "i"
        };
    }

    if (model) {
        query.model = {
            $regex: model,
            $options: "i"
        };
    }

    if (category) {
        query.category = {
            $regex: category,
            $options: "i"
        };
    }

    if (minPrice || maxPrice) {

        query.price = {};

        if (minPrice) {
            query.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            query.price.$lte = Number(maxPrice);
        }
    }

    return await Vehicle.find(query);
};
const purchaseVehicle = async (id) => {

    const vehicle = await Vehicle.findOneAndUpdate(
        {
            _id: id,
            quantity: { $gt: 0 }
        },
        {
            $inc: {
                quantity: -1
            }
        },
        {
            new: true
        }
    );

    if (!vehicle) {
        throw new Error(
            "Vehicle not available or out of stock"
        );
    }

    return vehicle;
};
const restockVehicle = async (id, quantity) => {

    if (!quantity || quantity <= 0) {
        throw new Error(
            "Restock quantity must be greater than zero"
        );
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
        id,
        {
            $inc: {
                quantity: quantity
            }
        },
        {
            new: true
        }
    );

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    return vehicle;
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    searchVehicles,
    purchaseVehicle,
    restockVehicle
};