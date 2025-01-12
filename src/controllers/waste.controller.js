const prisma = require("../db/index");

const getAllWastes = async (req, res) => {
    try {
        const wastes = await prisma.Waste.findMany();
        res.status(200).json(wastes);
    } catch (error) {
        console.error('Error fetching wastes:', error);
        res.status(500).json({ error: 'Error fetching wastes' });
    }
}

const getWasteByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const wastes = await prisma.Waste.findMany({ where: { result: category } });
        res.status(200).json(wastes);
    } catch (error) {
        console.error('Error fetching wastes:', error);
        res.status(500).json({ error: 'Error fetching wastes' });
    }
}

const getWasteById = async (req, res) => {
    try {
        const { id } = req.params;
        const waste = await prisma.Waste.findUnique({ where: { id } });
        res.status(200).json(waste);
    } catch (error) {
        console.error('Error fetching waste:', error);
        res.status(500).json({ error: 'Error fetching waste' });
    }
}

const deleteWaste = async (req, res) => {
    try {
        const { id } = req.params;
        const waste = await prisma.Waste.delete({ where: { id } });
        res.status(200).json(waste);
    } catch (error) {
        console.error('Error deleting waste:', error);
        res.status(500).json({ error: 'Error deleting waste' });
    }
}

module.exports = { getAllWastes, getWasteByCategory, getWasteById, deleteWaste };