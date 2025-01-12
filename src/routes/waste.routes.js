const express = require('express');
const { postPredictData } = require('../controllers/predict.controller');

const router = express.Router();
const { upload } = require('../utils/configFile');

router.post('/', upload.single('image'), postPredictData);

module.exports = router;