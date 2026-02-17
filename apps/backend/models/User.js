const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { userSchema, zodToMongoose } = require("@atcs/shared");

// Derive base definition from Zod schema
const definition = zodToMongoose(userSchema);

// Override fields that need Mongoose-specific features
definition.email = {
  type: "String",
  required: [true, "Please add an email"],
  unique: true,
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please add a valid email",
  ],
};
definition.password = {
  type: "String",
  select: false, // Don't return password by default
};

const UserSchema = new mongoose.Schema(definition);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
