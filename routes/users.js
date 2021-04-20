const express = require('express');
const { ensureAdmin } = require('../config/auth');
const usersController = require('../controllers/admin/users-controller');
const router = express.Router();

router.get('/', ensureAdmin, usersController.index);
router.post('/', ensureAdmin, usersController.save);
router.get('/new', ensureAdmin, usersController.new);
router.get('/:id', ensureAdmin, usersController.show);
router.get('/:id/edit', ensureAdmin, usersController.edit);
router.put('/:id', ensureAdmin, usersController.update);
router.delete('/:id', ensureAdmin, usersController.delete);

module.exports = router;
