const model = require('../models/addressesModel')
async function getById(id) {
    try {
        return model.getAddress(id);
    } catch (err) {
        throw err;
    }
}

module.exports = {  getById }