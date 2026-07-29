const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    buyerName: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    aadhar: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
    },

    drivingLicense: {
      type: String,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash"],
      default: "cash",
    },

    paymentConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
