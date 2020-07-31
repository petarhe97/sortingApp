const express = require('express');
const router = express.Router();
const sortingRoutes = require('./../controllers/sorting-controller.js')

/* POST a new sequence and its steps of sorting */
router.post('/sequence', sortingRoutes.sortSequence);

module.exports = router;
