const predictedClassification = require('../services/inference.service');
const addWaste = require('../models/waste.models');
const response = require('../response');
const loadModel = require('../services/loadModel.service');
const { uploadFile } = require('../utils/configFile');

let model;

(async () => {
    try {
        model = await loadModel()
    } catch (error) {
        console.error('Error loading model:', error);
        process.exit(1);
    }
})();

const postPredictData = async (req, res) => {
    try {
        const image = req.file.buffer;

        if (!image) {
            return response(400, 'error', 'Image is required', res);
        }

        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
            return response(400, 'error', 'Invalid image format', res);
        }

        if (!model) {
            return response(500, 'error', 'Model not loaded', res);
        }

        const { confidenceScore, result, explanation } = await predictedClassification(image, model);

        const imageUrl = await uploadFile(req.file);

        const wasteData = {
            result,
            explanation,
            confidenceScore,
            imageUrl: imageUrl
        }

        let waste;

        try {
            waste = await addWaste(wasteData);
        } catch (error) {
            console.error('Error adding waste:', error);
            return response(500, 'error', 'Failed to add waste', res);
        }

        return response(200, waste, 'Success', res);
    } catch (error) {
        console.error('Error processing request:', error);
        return response(500, 'error', 'Internal server error', res);
    }
}

module.exports = { postPredictData }