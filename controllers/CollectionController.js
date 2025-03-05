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
