'use strict'
const { isEqual, isEmpty, some, sortBy } = require('lodash/fp')
const Table = require('./src/table')

class TinyJsDb {
  constructor (opts = {}) {
    this._autoGenerateIds = opts.autoGenerateIds || true
    this._tables = new Map()
    this._relationships = []
  }

  get autoGenerateIds () {
    return this._autoGenerateIds
  }

  set autoGenerateIds (value) {
    throw new Error(
      'the autoGenerateIds configuration can be set only during initialization'
    )
  }

  get tables () {
    return [...this._tables.keys()]
  }

  get relationships () {
    return [...this._relationships]
  }

  createTable (name) {
    if (this.tableExists(name)) {
      throw new Error(`The table <${name}> already exists`)
    }

    const newTable = new Table(this, name)
    this._tables.set(name, newTable)
    return newTable
  }

  getTable (table) {
    const tableName = typeof table === 'object' ? table.name : table
    const tableRef = this._tables.get(tableName)
    if (!tableRef) {
      throw new Error(`Table ${tableName} does not exist`)
    }
    return tableRef
  }

  tableExists (name) {
    return this._tables.has(name)
  }

  createRelationship (tableA, tableB) {
    const tableARef = this.getTable(tableA)
    const tableBRef = this.getTable(tableB)
    const newRelationship = sortBy('name', [tableARef, tableBRef])

    this._checkRelationshipDuplication(newRelationship)

    this._relationships.push(newRelationship)
    return newRelationship
  }

  _checkRelationshipDuplication (relationship) {
    if (some(isEqual(relationship), this._relationships)) {
      throw new Error(
        `A relationship between tables <${relationship[0].name}> and <${relationship[1].name}> already exists`
      )
    }
  }

  getRelationship (tableA, tableB) {
    const tableARef = this.getTable(tableA)
    const tableBRef = this.getTable(tableB)
    const relationship = sortBy('name', [tableARef, tableBRef])

    return this._relationships.find(
      it =>
        it[0].name === relationship[0].name &&
        it[1].name === relationship[1].name
    )
  }

  relationshipExists (tableA, tableB) {
    return !isEmpty(this.getRelationship(tableA, tableB))
  }
}

module.exports = TinyJsDb
