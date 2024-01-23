const express = require('express');
const router = express.Router();
const WorkController = require('../controllers/work');
const { verificarToken } = require('../middlewares/auth');

router.get('/get-services', WorkController.getAllServices);

router.use(verificarToken);
router.post('/add-work', WorkController.addService);
router.delete('/delete-service/:id', WorkController.deleteService);
router.put('/update-service/:id', WorkController.updateService);

module.exports = router;
