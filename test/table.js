'use strict'
const test = require('tape')
const TinyJsDb = require('..')

test('Table:create - should create a table with given name', function (assert) {
  assert.plan(3)

  const testTable = 'testTable'
  const Db = new TinyJsDb()
  const table = Db.createTable(testTable)

  assert.equal(
    JSON.stringify([...Db.tables]),
    JSON.stringify([['testTable', []]]),
    'table should be added to database'
  )

  assert.equal(
    Db.tables.get(testTable).name,
    testTable,
    'table should contains a property "name" with corresponding value'
  )

  assert.equal(
    JSON.stringify(table),
    JSON.stringify([]),
    'table should be an empty array'
  )
})

test('Table:add - should add data to table', function (assert) {
  assert.plan(2)
  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')

  const newCar = { name: 'Ferrari', country: 'Italy' }
  cars.push({ name: 'Porsche', country: 'Germany' })
  cars.push(newCar)

  assert.equal(cars.length, 2)
  assert.equal(
    JSON.stringify(cars),
    '[{"name":"Porsche","country":"Germany"},{"name":"Ferrari","country":"Italy"}]'
  )
})
