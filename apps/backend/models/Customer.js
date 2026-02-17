const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    // Owner Details
    ownerFName: { type: String, required: true },
    ownerSName: { type: String, required: true },
    ownerTName: { type: String, required: true },
    ownerFoName: { type: String },
    passport: { type: String, required: true },
    natId: { type: String },
    residNum: { type: String },
    ownerEnteringDate: { type: Date },
    passportIssueDate: { type: Date },
    ownerResEndDate: { type: Date },
    ownerEmail: { type: String },

    // Car Details
    carType: { type: String, required: true },
    carModel: { type: String, required: true },
    chaseNum: { type: String, required: true },
    carColor: { type: String },
    plateNum: { type: String },
    engineNum: { type: String },
    carValue: { type: String },
    carRegCoun: { type: String },

    // Book (Carnet) Details
    carnetNo: { type: String, required: true },
    bookDate: { type: Date, required: true },
    bookType: { type: String, enum: ["عادي", "سياحي"], default: "عادي" },
    shippingPort: { type: String },
    arrivalDest: { type: String },
    portAccess: { type: String },
    shipName: { type: String },
    navAgent: { type: String },
    DeliveryAuthNum: { type: String },

    // Addresses
    addressKsa: {
      guarantor: { type: String },
      phone: { type: String },
      city: { type: String },
      district: { type: String },
      street: { type: String },
      building: { type: String },
      fullAddress: { type: String },
      whatsapp: { type: String },
    },
    addressSudan: {
      city: { type: String },
      district: { type: String },
      street: { type: String },
      square: { type: String },
      houseNum: { type: String },
      fullAddress: { type: String },
      phone1: { type: String },
      phone2: { type: String },
      whatsapp: { type: String },
    },

    // Relatives
    relative1: {
      name: { type: String },
      phone: { type: String },
      workAddress: { type: String },
      city: { type: String },
      district: { type: String },
      square: { type: String },
      houseNum: { type: String },
      houseAddress: { type: String },
    },
    relative2: {
      name: { type: String },
      phone: { type: String },
      workAddress: { type: String },
      city: { type: String },
      district: { type: String },
      square: { type: String },
      houseNum: { type: String },
      houseAddress: { type: String },
    },

    // System / Interaction Fields
    state: {
      type: String,
      enum: [
        "New", // دخول جديد
        "In Sudan", // لم يغادر (Not Left -> In Sudan)
        "Cleared", // مخلص
        "Left", // غادر
        "Violator", // مخالف
        "Leaving Soon", // مغادر قريبا
        "Extension Violator", // مخالفة تمديد
        "Extended", // ممددين
      ],
      default: "New",
    },

    threeMonthEx: { type: Boolean, default: false }, // Extended for 3 months?

    enteringDate: { type: Date },
    leftDate: { type: Date },
    clearDate: { type: Date },

    // Calculated Fields (can be virtuals or stored)
    stayingTime: { type: Number, default: 0 },
    availableTime: { type: Number, default: 90 }, // 90 or 180

    // Search Optimization
    keywords: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to generate keywords
CustomerSchema.pre("save", function () {
  const keywords = new Set(
    [
      this.carnetNo,
      this.ownerFName,
      this.ownerSName,
      this.ownerTName,
      this.ownerFoName,
      `${this.ownerFName} ${this.ownerSName}`,
      `${this.ownerFName} ${this.ownerSName} ${this.ownerTName}`,
      this.passport,
      this.chaseNum,
      this.state,
    ].filter(Boolean),
  );

  this.keywords = Array.from(keywords);
});

module.exports = mongoose.model("Customer", CustomerSchema);
