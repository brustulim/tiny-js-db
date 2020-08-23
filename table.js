'use strict'
const { find, slice } = require('lodash/fp')

class Table extends Array {
  constructor (name) {
    super()
    this._name = name
  }

  get name () {
    return this._name
  }

  // the "rename" a table is disabled for now
  set name (name) {
    throw new Error('A table cannot be renamed')
  }

  //   add (data) {
  //     this.push(data)
  //   }

  getFirst (condition) {
    return find(condition, this)
  }

  getAll (limit) {
    return limit ? slice(0, limit, this) : this
  }

  updateFirst (condition, data, replace = false) {
    var currentData = find(condition, this)
    if (!currentData) {
      throw new Error('There is no items that match the condition to update')
    }

    currentData = replace ? data : { ...currentData, ...data }
    return currentData
  }
}

// const instance = new Table(name)
module.exports = Table
