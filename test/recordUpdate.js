'use strict'
const test = require('tape')
const TinyJsDb = require('..')

function addFakeData (table) {
  table.insertMany([
    { name: 'Porsche', country: 'Germany' },
    { name: 'Fiat 147', country: 'Italy' },
    { name: 'VW Bus', country: 'Germany' },
    { name: 'Ferrari', country: 'Italy' },
    { name: 'Lamborghini', country: 'Italy' },
    { name: 'C2', country: 'France' }
  ])
}

test('Table:updateFirstWhere - should update ONLY the first record that match the given condition', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')
  addFakeData(cars)
  cars.updateFirstWhere({ country: 'Italy' }, { changed: true })

  assert.deepEqual(cars.getAll(), [
    { name: 'Porsche', country: 'Germany', _id: 0 },
    { name: 'Fiat 147', country: 'Italy', _id: 1, changed: true },
    { name: 'VW Bus', country: 'Germany', _id: 2 },
    { name: 'Ferrari', country: 'Italy', _id: 3 },
    { name: 'Lamborghini', country: 'Italy', _id: 4 },
    { name: 'C2', country: 'France', _id: 5 }
  ])
})

test('Table:updateAllWhere - should update ALL records (adding property) that match the given condition', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')
  addFakeData(cars)
  cars.updateAllWhere({ country: 'Italy' }, { changed: true })

  assert.deepEqual(cars.getAll(), [
    { name: 'Porsche', country: 'Germany', _id: 0 },
    { name: 'Fiat 147', country: 'Italy', _id: 1, changed: true },
    { name: 'VW Bus', country: 'Germany', _id: 2 },
    { name: 'Ferrari', country: 'Italy', _id: 3, changed: true },
    { name: 'Lamborghini', country: 'Italy', _id: 4, changed: true },
    { name: 'C2', country: 'France', _id: 5 }
  ])
})

test('Table:updateAllWhere - should update ALL records (changing property) that match the given condition', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')
  addFakeData(cars)
  cars.updateAllWhere({ country: 'Italy' }, { country: 'Brazil' })

  assert.deepEqual(cars.getAll(), [
    { name: 'Porsche', country: 'Germany', _id: 0 },
    { name: 'Fiat 147', country: 'Brazil', _id: 1 },
    { name: 'VW Bus', country: 'Germany', _id: 2 },
    { name: 'Ferrari', country: 'Brazil', _id: 3 },
    { name: 'Lamborghini', country: 'Brazil', _id: 4 },
    { name: 'C2', country: 'France', _id: 5 }
  ])
})
