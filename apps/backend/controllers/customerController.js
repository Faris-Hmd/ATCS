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
    const { startDate, endDate, state, searchBy, keyword, violator, extended } =
      req.query;

    let query = {};

    // Keyword Search
    if (keyword && keyword !== "null" && keyword !== "") {
      query.keywords = { $in: [new RegExp(keyword, "i")] };
    }

    // Date Filtering
    if (startDate && endDate && searchBy) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Add 1 day to end date to include it
      end.setDate(end.getDate() + 1);
      query[searchBy] = { $gte: start, $lte: end };
    }

    // State Filtering
    if (state && state !== "null") {
      query.state = state;
    }

    // Violator Filtering
    if (violator === "true") {
      query.violator = true;
    }

    // Extended Filtering
    if (extended === "true") {
      query.extended = true;
    }

    // Projection – only fields needed by the UI
    const projection = {
      ownerFName: 1,
      ownerSName: 1,
      ownerTName: 1,
      passport: 1,
      carType: 1,
      carModel: 1,
      chaseNum: 1,
      plateNum: 1,
      carnetNo: 1,
      bookDate: 1,
      enteringDate: 1,
      leftDate: 1,
      state: 1,
      violator: 1,
      extended: 1,
      stayingTime: 1,
      availableTime: 1,
    };

    // Execution
    const customers = await Customer.find(query, projection).sort({
      createdAt: -1,
    });

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
