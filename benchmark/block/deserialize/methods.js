const { models } = require('@laroue/crypto')

exports.deserialize = data => {
    return models.Block.deserialize(data)
}
