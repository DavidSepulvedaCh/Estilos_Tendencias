const express = require('express');
const ShoppingCarController = require('../controllers/shoppingcar');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth');

router.use(verificarToken);
router.get('/add-car', ShoppingCarController.addProductCar);
router.get('/car-shopping', ShoppingCarController.getContentCar);
router.post('/delete-product', ShoppingCarController.deleteProductCar);

module.exports = router;
