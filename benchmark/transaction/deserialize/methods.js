const {
    models
} = require('@laroue/crypto')

exports.deserialize = data => {
    return models.Transaction.deserialize(data)
}
