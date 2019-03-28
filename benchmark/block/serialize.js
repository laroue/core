const {
    models
} = require('@laroue/crypto')

const data = require('../helpers').getJSONFixture('block/deserialized/no-transactions');

exports['core'] = () => {
    return models.Block.serialize(data);
};
