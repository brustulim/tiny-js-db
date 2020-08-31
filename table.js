'use strict'
const {
  find,
  findIndex,
  slice,
  pipe,
  filter,
  map,
  isEmpty
} = require('lodash/fp')
const { updateObject, replaceObject } = require('./util')

// data must be private to prevent unattended changes and undesired side effects
const tableName = Symbol('tableName')
const tableData = Symbol('tableData')
const tableRelations = Symbol('tableRelations')

class Table {
  constructor (db, name) {
    this._db = db
    this[tableName] = name
    this[tableData] = []
    this[tableRelations] = []
  }

  get length () {
    return this[tableData].length
  }

  get name () {
    return this[tableName]
  }

  // the "rename" table is disabled for now
  set name (name) {
    throw new Error('A table cannot be renamed')
  }

  getById (id, relations = []) {
    return this._getDataWithRelatedRecords(id, relations)
  }

  getFirst (condition, relations = []) {
    if (isEmpty(relations)) {
      return find(condition, this[tableData])
    }
    const index = findIndex(condition, this[tableData])
    if (index === -1) {
      return
    }

    return this._getDataWithRelatedRecords(index, relations)
  }

  _getDataWithRelatedRecords (index, relations = []) {
    return relations.reduce((acc, currTable) => {
      const records = this._getRelatedRecords(currTable, index)
      return { ...acc, [currTable]: records }
    }, this[tableData][index])
  }

  _getRelatedRecords (foreignTable, localId) {
    const relationship = this._getOrCreateRelationshipWith(foreignTable)
    const relatedIds = relationship.data[localId]
    if (!relatedIds) {
      return []
    }

    return relatedIds.map(id => relationship.table.getById(id))
  }

  getAll (limit) {
    return [].concat(limit ? slice(0, limit, this[tableData]) : this[tableData])
  }

  getId (data) {
    if (typeof data === 'number') {
      this._checkIdExistence(data)
      return data
    } else if (typeof data === 'object') {
      if (this._db.autoGenerateIds) {
        const id = data._id
        if (isNaN(id)) {
          throw new Error('Cannot get data. The given record has no _id')
        }
        this._checkIdExistence(id)
        return id
      }
      const index = this[tableData].indexOf(data)
      if (index === -1) {
        throw new Error(
          'The given data is not a valid record or does not exist on the table'
        )
      }
      return index
    } else {
      throw new Error('The given data is not a valid id or record')
    }
  }

  _checkIdExistence (id) {
    if (!this[tableData][id]) {
      throw new Error(`There is no record with given id <${id}>`)
    }
  }

  add (data) {
    // Object.freeze(data)
    if (Array.isArray(data)) {
      data.forEach(this._addNewRecord)
    } else {
      this._addNewRecord(data)
    }
  }

  addMany (data) {
    // Object.freeze(data)
    if (!Array.isArray(data)) {
      throw new Error('addMany expects an array')
    }
    data.forEach(this._addNewRecord.bind(this))
  }

  _addNewRecord (data) {
    const newLength = this[tableData].push(data)
    if (this._db.autoGenerateIds) {
      data._id = newLength - 1
    }
    return data
  }

  updateFirstWhere (condition, newData, replace = false) {
    var value = find(condition, this[tableData])
    if (!value) {
      throw new Error('There is no items that match the condition to update')
    }

    return replace
      ? replaceObject(value, newData)
      : updateObject(value, newData)
  }

  updateAllWhere (condition, newData, replace = false) {
    // TODO: Do some benchmark and find the best way to do this
    return pipe(
      filter(condition),
      map(item =>
        replace ? replaceObject(item, newData) : updateObject(item, newData)
      )
    )(this[tableData])
  }

  getRelationships () {
    return this[tableRelations].map('name')
  }

  addRelation (localItem, foreignTable, foreignItem) {
    if (!this._db.relationshipExists(this.name, foreignTable)) {
      throw new Error('There is no relationship with the given foreign table')
    }
    const foreignTableRef = this._db.getTable(foreignTable)

    this.persistRelation(
      { table: this, item: localItem },
      { table: foreignTableRef, item: foreignItem }
    )

    foreignTableRef.persistRelation(
      { table: foreignTableRef, item: foreignItem },
      { table: this, item: localItem }
    )
  }

  persistRelation (local, foreign) {
    const relationship = this._getOrCreateRelationshipWith(foreign.table.name)

    const localRecordId = this.getId(local.item)
    const foreignRecordId = foreign.table.getId(foreign.item)

    if (!relationship.data[localRecordId]) {
      relationship.data[localRecordId] = [foreignRecordId]
    } else {
      if (relationship.data[localRecordId].indexOf(foreignRecordId) === -1) {
        relationship.data[localRecordId].push(foreignRecordId)
      }
    }
  }

  _getOrCreateRelationshipWith (tableName) {
    const relationship = this[tableRelations].find(
      relation => relation.table.name === tableName
    )

    return relationship || this._createRelationship(tableName)
  }

  _createRelationship (tableName) {
    const table = this._db.getTable(tableName)
    const newRelationship = { table, data: [] }
    this[tableRelations].push(newRelationship)
    return newRelationship
  }
}

module.exports = Table
