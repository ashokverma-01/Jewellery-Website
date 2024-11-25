const express = require('express');
const {
    createCustomer,
    getCustomer,
    statusChange,
    deleteCustomer,
    updateCustomer,
    searchCustomers} = require('../controllers/CustomerController');


const router = express.Router();

router.post('/create-customer', createCustomer);
router.get('/get-customer',getCustomer);
router.put('/update-customer/:id',updateCustomer);
router.put('/status-change/:id',statusChange);
router.delete('/delete-customer/:id', deleteCustomer);
router.get('/search-customer', searchCustomers);

module.exports = router;
