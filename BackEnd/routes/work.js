const express = require('express');
const router = express.Router();
const WorkController = require('../controllers/work');
const { verificarToken } = require('../middlewares/auth');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get-services', WorkController.getAllServices);

router.use(verificarToken);
router.post('/add-service', upload.single('image'), WorkController.addService);
router.delete('/delete-service/:id', WorkController.deleteService);
router.put('/update-service/:id', upload.single('image'), WorkController.updateService);

module.exports = router;
