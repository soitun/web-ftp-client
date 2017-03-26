'use strict'

const db = require('./../db')
const extend = require('extend')
const Server = require('./../server')

const action = {}

/**
 * Require user
 * @type {boolean}
 */
action.requireUser = true

/**
 * Execute the action
 * @param {WebSocketUser} user
 * @param {*} message
 * @param {function} callback
 */
action.execute = function (user, message, callback) {
  const formData = message.formData
  if (formData.host && formData.port) {
    let storedData = {}
    if (message.id) {
      storedData = Server.get(message.id).data
    } else {
      storedData = {
        'id': db.getNextId()
      }
    }
    // simply merging data from form into data object
    extend(true, storedData, formData)
    Server.get(message.id).update()
  }
  callback()
}

module.exports = action