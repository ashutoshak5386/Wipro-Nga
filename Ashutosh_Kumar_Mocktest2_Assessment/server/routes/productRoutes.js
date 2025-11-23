const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post(
    '/',
    [
        body('name').isString().notEmpty().withMessage('Name is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
    ],
    productController.createProduct
);

module.exports = router;
