'use strict'
const { isEqual, isEmpty, some, sortBy } = require('lodash/fp')
const Table = require('./src/table')

/**
 * @typicalname db
 * @class TinyJsDb
 * @classdesc Main tiny-js-db database controller
 * @param {object} [opts] - Database configurations
 * @param {boolean} [opts.autoGenerateIds=true] - Set if ids will be generated automatically
 * @description
 * Creates a new database instance and provide functions to manage the database.
 * @example
 * const TinyJsDb = require('tiny-js-db')
 * const db = new TinyJsDb()
 */
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

  /**
   * Return all tables name from the database
   *
   * @return {string[]} array of strings containing the tables name
   * @example
   * const tables = db.tables
   * console.log(tables)
   * // ['cars','countries']
   */
  get tables () {
    return [...this._tables.keys()]
  }

  /**
   * Return the relationships from the database
   *
   * @return { Array[]} array of tables instance pairs for each relationship on database
   * @example
   * const relationships = db.relationships
   * console.log(relationships)
   * // [
   * //   [ table1, table2 ],
   * //   [ table1, table3 ]
   * // ]
   */
  get relationships () {
    return [...this._relationships]
  }

  /**
   * Creates a new table on database
   *
   * @param {string} name - name of the table
   * @return {object} table instance
   * @example
   * db.createTable('cars')
   * // if you want the new table instance
   * const cars = db.createTable('cars')
   */
  createTable (name) {
    if (this.tableExists(name)) {
      throw new Error(`The table <${name}> already exists`)
    }

    const newTable = new Table(this, name)
    this._tables.set(name, newTable)
    return newTable
  }

  /**
   * Return a table instance
   *
   * @param {string|object} table - An string containing the table name or an instance of a Table
   * @return {object} table instance
   * @example
   * const cars db.getTable('cars')
   */
  getTable (table) {
    const tableName = typeof table === 'object' ? table.name : table
    const tableRef = this._tables.get(tableName)
    if (!tableRef) {
      throw new Error(`Table ${tableName} does not exist`)
    }
    return tableRef
  }

  /**
   * Check if a table exists in the database
   *
   * @param {string} name - An string containing the table name
   * @return {boolean} true if the table exists and false if not
   * @example
   * if(db.tableExists('cars')){}
   */
  tableExists (name) {
    return this._tables.has(name)
  }

  /**
   * Create a relationship between two tables
   * - The order of the tables are not important
   * - If you try to create a relationship that already exists, an error will throw
   *
   * @param {string|object} tableA - An string containing the table name or an instance of a Table
   * @param {string|object} tableB - An string containing the table name or an instance of a Table
   * @return {object} The created relationship
   * @example
   * db.createRelationship('cars', 'countries')
   * // or
   * db.createRelationship(cars, 'countries')
   * // or
   * db.createRelationship(cars, countries)
   * // or
   * const newRelation = db.createRelationship(cars, countries)
   */
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

  /**
   * Get a relationship
   * - The order of the tables are not important
   *
   * @param {string|object} tableA - An string containing the table name or an instance of a Table
   * @param {string|object} tableB - An string containing the table name or an instance of a Table
   * @return {object} The relationship
   * @example
   * const relation = db.getRelationship('cars', 'countries')
   * // or
   * const relation = db.getRelationship('countries', 'cars')
   * // or
   * const relation = db.getRelationship(cars, 'countries')
   * // or
   * const relation = db.getRelationship(cars, countries)
   */
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

  /**
   * Check if a relationship between two tables exist
   * - The order of the tables are not important
   *
   * @param {string|object} tableA - An string containing the table name or an instance of a Table
   * @param {string|object} tableB - An string containing the table name or an instance of a Table
   * @return {boolean} true if the relationship exists and false if not
   * @example
   * if(db.relationshipExists('cars','countries')){}
   * // or
   * if(db.relationshipExists('countries', 'cars')){}
   * // or
   * if(db.relationshipExists(cars,'countries')){}
   * // or
   * if(db.relationshipExists(cars,countries)){}
   */
  relationshipExists (tableA, tableB) {
    return !isEmpty(this.getRelationship(tableA, tableB))
  }
}

module.exports = TinyJsDb
