const express = require('express');
const { ensureAdmin } = require('../config/auth');
const transportsController = require('../controllers/transports-controller');

const router = express.Router();

router.get('/', ensureAdmin, transportsController.index);
router.post('/', ensureAdmin, transportsController.save);
router.get('/new', ensureAdmin, transportsController.new);
router.get('/:id', ensureAdmin, transportsController.show);
router.get('/:id/edit', ensureAdmin, transportsController.edit);
router.put('/:id', ensureAdmin, transportsController.update);
router.delete('/:id', ensureAdmin, transportsController.delete);

module.exports = router;
