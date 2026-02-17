const Customer = require("../models/Customer");

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Public
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all customers with filtering
// @route   GET /api/customers
// @access  Public
exports.getCustomers = async (req, res) => {
  try {
    const { startDate, endDate, state, searchBy, keyword } = req.query;

    let query = {};

    // Keyword Search
    if (keyword && keyword !== "null" && keyword !== "") {
      // Using the pre-generated keywords array
      query.keywords = { $in: [new RegExp(keyword, "i")] }; // Simple regex match on keywords
      // Or if exact match is needed for some fields:
      // query.keywords = keyword;
    } else {
      // Date Filtering
      if (startDate && endDate) {
        // searchBy is usually 'enteringDate' or 'bookDate'
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Add 1 day to end date to include it
        end.setDate(end.getDate() + 1);

        if (searchBy) {
          query[searchBy] = { $gte: start, $lte: end };
        }
      }

      // State Filtering
      if (state && state !== "null") {
        query.state = state;
      }
    }

    // Execution
    const customers = await Customer.find(query).sort({ createdAt: -1 });

    const count = await Customer.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      data: customers,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Public
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update customer
// @route   PATCH /api/customers/:id
// @access  Public
exports.updateCustomer = async (req, res) => {
  try {
    // TODO: Recalculate status/state logic here if needed based on dates

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Public
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
