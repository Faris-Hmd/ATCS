const mongoose = require("mongoose");
const { receiptSchema, zodToMongoose } = require("@atcs/shared");

// Derive base definition from Zod schema
const definition = zodToMongoose(receiptSchema);

// Override fields that need Mongoose-specific features (ObjectId refs, unique, etc.)
definition.customer = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Customer",
  required: true,
};
definition.issuedBy = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
};
definition.receiptDate = { type: "Date", default: Date.now };
definition.receiptNumber = { type: "String", unique: true };

const ReceiptSchema = new mongoose.Schema(definition, {
  timestamps: true,
});

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
