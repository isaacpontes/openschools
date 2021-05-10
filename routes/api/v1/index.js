const express = require('express');

const schoolsController = require('../../../controllers/api/v1/schools-controller');

const router = express.Router();

router.get('/schools/:id', schoolsController.show);

module.exports = router;
