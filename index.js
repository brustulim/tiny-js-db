'use strict'
const { isEqual, some } = require('lodash/fp')
const Table = require('./table')

class TinyJsDb {
  constructor (opts = {}) {
    this.tables = new Map()
    this.relations = []
  }

  createTable (name) {
    const newTable = new Table(name)
    this.tables.set(name, newTable)
    return newTable
  }

  createRelation (tableA, tableB) {
    const tables = [tableA, tableB].sort()

    if (some(isEqual(tables), this.relations)) {
      throw new Error('A relationship between this tables already exists')
    }

    this.relations.push(tables)
    return tables
  }
}

module.exports = TinyJsDb
