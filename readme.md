# mix-in

Turns a set of functions into a mix-in/trait that can extend a class.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i mix-in
```

## Basic Usage

### Step 1: Define the Mix-In

Let’s say you want to create a module that adds `enable()` and `disable()` methods to a class. Your module would `require('mix-in')` and look like this:

```javascript
const Mixin = require('mix-in')

module.exports = Mixin({
  enable () {
    // TODO
  },

  disable () {
    // TODO
  },
})
```

This is all you need to do for your mix-in module. Easy enough, right? Now we’ll turn to the module that makes use of your new mix-in.

### Step 2: Require and Apply the Mix-In

Let’s say you have a second module that exports a `Button` class and you want to extend it with your mix-in module from step 1, which you named `@lamansky/enable-disable-mix-in`.

```javascript
module.exports = class Button {
  // Methods go here
}
```

All you have to do in the dependent module is:
1. Require the mix-in.
2. Call it as a function without arguments.
3. Call it again, passing the class as an argument.

Like so:

```javascript
// Note the function call at the end of this line; you need to have that!
const EnableDisable = require('@lamansky/enable-disable-mix-in')()

module.exports = EnableDisable(class Button {
  // This class now has enable() and disable() methods!
})
```

That’s it! Your `Button` class prototype now has `enable()` and `disable()` methods.

## Advanced Usage: Parameters

You can also create mix-ins that accept arguments. This is useful for creating configurable mix-ins, or mix-ins that access private properties using symbols.

### Step 1: Define the Mix-In

Instead of defining your mix-in as an object, we’ll create a function that takes arguments. Let’s modify our previous mix-in so that it makes use of a symbol:

```javascript
const Mixin = require('mix-in')

module.exports = Mixin(_enabled => ({
  enable () {
    this[_enabled] = true
  },

  disable () {
    this[_enabled] = false
  },
}))
```

### Step 2: Require and Apply the Mix-In

Now do the following in the dependent module:
1. Require the mix-in.
2. Call it as a function, passing the arguments your mix-in is expecting.
3. Call it again, passing the class as an argument.

```javascript
const _enabled = Symbol('enabled')
const EnableDisable = require('@lamansky/enable-disable-mix-in')(_enabled)

module.exports = EnableDisable(class Button {
})
```

Just like before, your `Button` now has `enable()` and `disable()` in its prototype, except this time, both your `Button` class and your mix-in have access to the same `_enabled` symbol.
