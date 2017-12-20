'use strict'

const assert = require('assert')
const Mixin = require('.')

describe('Mixin()', function () {
  it('should return a function that extends a prototype', function () {
    const TheMixin = Mixin({
      get data () {
        return true
      },
    })()

    const Test = TheMixin(class {})

    const test = new Test()
    assert(test.data)
  })

  it('should support passing parameters to the mixin', function () {
    const priv = Symbol('private')

    const TheMixin = Mixin(p => class {
      get data () {
        return this[p]
      }
    })(priv)

    const Test = TheMixin(class {
      constructor () {
        this[priv] = true
      }
    })

    const test = new Test()
    assert(test.data)
  })
})
