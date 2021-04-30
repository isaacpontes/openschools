const express = require('express');
const { ensureAdmin } = require('../config/auth');
const sectorsController = require('../controllers/admin/sectors-controller');

const router = express.Router();

router.get('/', ensureAdmin, sectorsController.index);
router.post('/', ensureAdmin, sectorsController.save);
router.get('/new', ensureAdmin, sectorsController.new);
router.get('/:id/edit', ensureAdmin, sectorsController.edit);
router.put('/:id', ensureAdmin, sectorsController.update);
router.delete('/:id', ensureAdmin, sectorsController.delete);

module.exports = router;
