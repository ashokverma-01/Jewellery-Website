const Customer = require('../models/Customer');

// Controller to create a new customer
exports.createCustomer = async (req, res) => {
  const { name,email,mobile,message} = req.body;

  try {
    const newCustomer = new Customer({ name,email,mobile,message });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all customer
exports.getCustomer = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const Customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments();

    res.status(200).json({
      customers: Customers,
      total: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!customer) {
      return res.status(404).json({
        status: "FAILURE",
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      status: "SUCCESS",
      message: "Customer updated successfully",
      customer,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


// //delete api
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//status changes customer
exports.statusChange = async (req, res, next) => {
  try {
    const startTime = new Date().getTime();
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        status: "NOTFOUND",
        message: "Customer not found",
      });
    }

    customer.is_status = !customer.is_status;
    await customer.save();

    return res.status(200).json({
      status: "SUCCESS",
      message: "Status changed successfully",
      customer,
      startTime
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

//search api 
exports.searchCustomers = async (req, res) => {
  // Extract search query from the request query parameters
  const { key } = req.query;

  // Build a query object for the search
  let query = {};
  if (key) {
    // Regex to match names starting with the provided key
    const regex = new RegExp(`^${key}`, 'i'); // Case-insensitive and starts with
    query = {
      "$or": [
        { name: regex }
      ]
    };
  }

  try {
    // Execute search query
    const customers = await Customer.find(query);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


