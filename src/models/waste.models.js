const prisma = require("../db/index");

const addWaste = async (wasteData) => {
    const waste = await prisma.Waste.create({
        data: {
            result: wasteData.result,
            explanation: wasteData.explanation,
            confidence: wasteData.confidenceScore,
            imageUrl: wasteData.imageUrl
        }
    })

    return waste
}

module.exports = addWaste