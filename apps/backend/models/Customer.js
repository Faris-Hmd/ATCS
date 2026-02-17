const mongoose = require("mongoose");
const { customerSchema, zodToMongoose } = require("@atcs/shared");

// Derive the Mongoose schema definition from the Zod schema
const definition = zodToMongoose(customerSchema);

// The Zod schema uses `z.coerce.date()` which wraps Date in ZodEffects,
// and `zodToMongoose` handles that. But for `bookDate`, Zod marks it as
// non-optional while the converter sees it as a plain Date, so `required`
// is set automatically.

const CustomerSchema = new mongoose.Schema(definition, {
  timestamps: true,
});

// Pre-save hook to generate keywords for search optimization
CustomerSchema.pre("save", function () {
  // --- Business Logic ---

  // 1. Set Available Time based on Extended status
  if (this.extended) {
    this.availableTime = 180;
  } else {
    this.availableTime = 90;
  }

  // 2. Calculate Staying Time
  if (this.enteringDate) {
    const entering = new Date(this.enteringDate);
    const end = this.leftDate ? new Date(this.leftDate) : new Date();
    const diffTime = Math.abs(end - entering);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.stayingTime = diffDays;
  } else {
    this.stayingTime = 0;
  }

  // 3. Set Violator status
  // If staying time exceeds available time, they are a violator
  if (this.stayingTime > this.availableTime) {
    this.violator = true;
  }
  // Note: We don't auto-set it to false here to allow manual overrides if needed,
  // or we can enforce strictly: this.violator = this.stayingTime > this.availableTime;
  // Based on user prompt "if ... greater ... will be violator", strict seems appropriate.
  this.violator = this.stayingTime > this.availableTime;

  // --- Search Keywords ---
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
