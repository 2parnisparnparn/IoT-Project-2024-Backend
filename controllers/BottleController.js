const Bottle = require('../models/BottleModel');

exports.addBottle = async (req, res) => {
    const { bottle_type, bottle_Etype,carbon_credit } = req.body; 

   
    if (!bottle_type || !carbon_credit) {
        return res.status(400).json({ message: 'Bottle type and carbon credit are required' });
    }

    try {
       
        const result = await Bottle.addBottle({ bottle_type, bottle_Etype, carbon_credit });
        res.status(200).json(result); 
    } catch (e) {
        console.error('Error in addBottle:', e);
        res.status(500).send(e.message);  
    }
    
};


exports.getBottleByType = async (req, res) => {
    const { bottle_type } = req.params; 
    try {
        const bottles = await Bottle.getBottleByType(bottle_type);
        res.status(200).json({ bottles });
    } catch (err) {
        console.error('Error fetching bottles by type:', err);
        res.status(500).json({ error: err.message });
    }
};