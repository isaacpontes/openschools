const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const studentsController = require('../controllers/students-controller');

const router = express.Router();

router.post('/', ensureAuthenticated, studentsController.save);
router.get('/:id', ensureAuthenticated, studentsController.show);
router.get('/:id/edit', ensureAuthenticated, studentsController.edit);
router.put('/:id', ensureAuthenticated, studentsController.update);
router.delete('/:id', ensureAuthenticated, studentsController.delete);

module.exports = router;
