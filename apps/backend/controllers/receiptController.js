const Receipt = require("../models/Receipt");

// @desc    Create new receipt
// @route   POST /api/receipts
// @access  Private
exports.createReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.create({
      ...req.body,
      issuedBy: req.user.id, // From auth middleware
    });

    res.status(201).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all receipts
// @route   GET /api/receipts
// @access  Private (Admin/Manager)
exports.getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate("customer", "ownerFName ownerSName carnetNo")
      .populate("issuedBy", "name");

    res.status(200).json({
      success: true,
      count: receipts.length,
      data: receipts,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single receipt
// @route   GET /api/receipts/:id
// @access  Private
exports.getReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("customer")
      .populate("issuedBy", "name");

    if (!receipt) {
      return res
        .status(404)
        .json({ success: false, error: "Receipt not found" });
    }

    res.status(200).json({ success: true, data: receipt });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
