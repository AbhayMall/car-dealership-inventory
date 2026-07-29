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

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};