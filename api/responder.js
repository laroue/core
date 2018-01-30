const logger = requireFrom('core/logger')
const MethodMissing = requireFrom('utils/method-missing')
const State = requireFrom('api/plugins/state')
const errors = require('restify-errors')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')

class Responder extends MethodMissing {
  getFilePath (name) {
    const version = { '1.0.0': 'v1', '2.0.0': 'v2' }[State.getRequest().version()]

    return path.resolve(__dirname, `public/${version}/responses/${name}`)
  }

  methodMissing (name, ...args) {
    const errorClass = `${name.charAt(0).toUpperCase() + name.slice(1)}Error`

    if (errors.hasOwnProperty(errorClass)) {
      logger.error(args[0])

      return State.getResponse().send(new errors[errorClass](args[0]))
    }

    try {
      const responderFile = this.getFilePath(_.kebabCase(name))

      if (fs.statSync(responderFile + '.js').isFile()) {
        return require(responderFile)(args[0], args[1] || {})
      }
    } catch (error) {
      logger.error(error.message)

      return State.getResponse().send(new errors.InternalServerError('An unknown error has occurred.'))
    }
  }
}

module.exports = new Responder()
