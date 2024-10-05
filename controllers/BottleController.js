const Bottle = require('../models/BottleModel');

// Controller to handle the POST API for adding a new bottle
exports.addBottle = async (req, res) => {
    const { bottle_type, carbon_credit } = req.body;  // Destructure bottle data from request body

    // Validate that both fields are provided
    if (!bottle_type || !carbon_credit) {
        return res.status(400).json({ message: 'Bottle type and carbon credit are required' });
    }

    try {
        // Create the bottle using the Bottle model
        const result = await Bottle.addBottle({ bottle_type, carbon_credit });
        res.status(200).json(result);  // Respond with the result
    } catch (e) {
        console.error('Error in addBottle:', e);
        res.status(500).send(e.message);  // Respond with an error message
    }
    
};


// Controller to handle fetching bottles by type
exports.getBottleByType = async (req, res) => {
    const { bottle_type } = req.params; // Assuming bottle_type is passed as a route parameter

    try {
        const bottles = await Bottle.getBottleByType(bottle_type);
        res.status(200).json({ bottles });
    } catch (err) {
        console.error('Error fetching bottles by type:', err);
        res.status(500).json({ error: err.message });
    }
};