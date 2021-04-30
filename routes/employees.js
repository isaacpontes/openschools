const express = require('express');
const { ensureAdmin } = require('../config/auth');
const employeesController = require('../controllers/admin/employees-controller');

const router = express.Router();

router.get('/', ensureAdmin, employeesController.index);
router.post('/', ensureAdmin, employeesController.save);
router.get('/new', ensureAdmin, employeesController.new);
router.get('/:id', ensureAdmin, employeesController.show);
router.get('/:id/edit', ensureAdmin, employeesController.edit);
router.put('/:id', ensureAdmin, employeesController.update);
router.delete('/:id', ensureAdmin, employeesController.delete);

module.exports = router;
