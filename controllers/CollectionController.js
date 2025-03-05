const Collection = require('../models/Collection');

exports.PastCollection = async (req, res) => {
    try {
        const result = await Collection.getPastCollection();

        if (result.data.length === 0) {
            return res.status(404).send("No past collection found");
        }

        res.status(200).json(result.data);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.CollectionByDate = async (req, res) => {
    try {
        const result = await Collection.getCollectionByDate();

        if (result.data.length === 0) {
            return res.status(404).send("No collection found");
        }

        res.status(200).json(result.data);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addPastCollection = async (req, res) => {
    try {
        const result = await Collection.addPastCollection();

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: 'Past collection added successfully',
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to add past collection'
            });
        }
    } catch (error) {
        console.error('Error in addPastCollection controller:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};