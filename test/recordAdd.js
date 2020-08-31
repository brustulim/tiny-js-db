'use strict'
const test = require('tape')
const TinyJsDb = require('..')

test('Table:addMany - should insert many records to table', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')
  cars.addMany([
    { name: 'Porsche', country: 'Germany' },
    { name: 'Fiat 147', country: 'Italy' },
    { name: 'VW Bus', country: 'Germany' },
    { name: 'Ferrari', country: 'Italy' },
    { name: 'Lamborghini', country: 'Italy' },
    { name: 'C2', country: 'France' }
  ])

  assert.deepEqual(cars.getAll(), [
    { name: 'Porsche', country: 'Germany', _id: 0 },
    { name: 'Fiat 147', country: 'Italy', _id: 1 },
    { name: 'VW Bus', country: 'Germany', _id: 2 },
    { name: 'Ferrari', country: 'Italy', _id: 3 },
    { name: 'Lamborghini', country: 'Italy', _id: 4 },
    { name: 'C2', country: 'France', _id: 5 }
  ])
})
