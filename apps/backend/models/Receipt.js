const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["SDG", "SAR", "USD"],
      default: "SDG",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Cheque"],
      default: "Cash",
    },
    description: {
      type: String,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiptDate: {
      type: Date,
      default: Date.now,
    },
    receiptNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate receipt number
ReceiptSchema.pre("save", async function (next) {
  if (!this.receiptNumber) {
    const count = await this.constructor.countDocuments();
    // Format: REC-YYYY-0001
    const year = new Date().getFullYear();
    this.receiptNumber = `REC-${year}-${(count + 1).toString().padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
