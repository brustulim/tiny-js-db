'use strict'

class Record {
  constructor () {
    this._relations = []
  }

  addReference (table, data) {
    this._relations[table].push(data)
    return this
  }

  removeReference (table, data) {
    const relations = this._relations[table]
    relations.splice(relations.indexOf(data), 1)
    return this
  }
}

module.exports = Record
