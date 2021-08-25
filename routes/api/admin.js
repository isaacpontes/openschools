const express = require('express');
const sectorsController = require('../../controllers/api/admin/sectors-controller');

const router = express.Router();

router.get('/sectors', sectorsController.findAll);
router.get('/sectors/:id', sectorsController.findById);
router.post('/sectors', sectorsController.save);
router.put('/sectors/:id', sectorsController.update);
router.delete('/sectors/:id', sectorsController.delete);

module.exports = router;
