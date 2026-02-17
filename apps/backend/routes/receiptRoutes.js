const express = require("express");
const router = express.Router();
const {
  createReceipt,
  getReceipts,
  getReceipt,
} = require("../controllers/receiptController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect); // Protect all routes

router
  .route("/")
  .post(createReceipt)
  .get(authorize("admin", "manager"), getReceipts);

router.route("/:id").get(getReceipt);

module.exports = router;
