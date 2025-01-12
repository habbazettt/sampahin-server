const express = require('express');
const { getAllWastes, getWasteByCategory, getWasteById, deleteWaste } = require('../controllers/waste.controller');
const router = express.Router();

router.get('/', getAllWastes);
router.get('/:id', getWasteById);
router.get('/category/:category', getWasteByCategory);
router.delete('/:id', deleteWaste);

module.exports = router;