'use strict'

const extend = require('extend-prototype')
const pf = require('possible-function')

module.exports = m => (...args) => cls => extend(cls, pf(m, m)(...args))
