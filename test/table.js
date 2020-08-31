'use strict'
const test = require('tape')
const TinyJsDb = require('..')

test('Table:create - should create a table with given name', function (assert) {
  assert.plan(2)

  const testTable = 'testTable'
  const Db = new TinyJsDb()
  const table = Db.createTable(testTable)

  assert.deepEqual(
    Db.tables,
    ['testTable'],
    'table should be added to database'
  )

  assert.equals(
    table.name,
    testTable,
    'table should contains a property "name" with corresponding value'
  )
})

test('Table:create - should throw an error if tries to create a duplicated table', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')

  assert.throws(
    () => {
      Db.createTable('cars')
    },
    { message: 'The table <cars> already exists' }
  )
})

test('Table:add - should add data to table', function (assert) {
  assert.plan(2)
  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')

  const newCar = { name: 'Ferrari', country: 'Italy' }
  cars.add({ name: 'Porsche', country: 'Germany' })
  cars.add(newCar)

  assert.equal(cars.length, 2)
  assert.deepEqual(cars.getAll(), [
    { name: 'Porsche', country: 'Germany', _id: 0 },
    { name: 'Ferrari', country: 'Italy', _id: 1 }
  ])
})
