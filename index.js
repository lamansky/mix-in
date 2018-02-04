'use strict'

const extend = require('extend-prototype')
const pfn = require('pfn')

module.exports = m => (...args) => cls => extend(cls, pfn(m, m)(...args))
