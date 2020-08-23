'use strict'
const test = require('tape')
const TinyJsDb = require('..')

test('Relationship:create - should create a relationship', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')
  //   const cars = Db.createTable('cars')
  //   cars.push({ name: 'porsche'})

  Db.createTable('countries')
  //   const countries = Db.createTable('countries')
  //   countries.push({ country: 'Germany'})

  //   const relation = Db.createRelation('cars', 'countries')
  Db.createRelation('cars', 'countries')

  assert.equal(
    JSON.stringify([...Db.relations]),
    '[["cars","countries"]]',
    'relationship should be added to database'
  )
})

test('Relationship:create - should throw an error if tries to create a duplicated relationship', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')
  Db.createTable('countries')

  Db.createRelation('cars', 'countries')

  assert.throws(
    () => {
      Db.createRelation('cars', 'countries')
    },
    { message: 'A relationship between this tables already exists' }
  )
})

test('Relationship:create - should throw an error if tries to create a duplicated relationship (even when tables are informed in different order)', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')
  Db.createTable('countries')

  Db.createRelation('cars', 'countries')

  assert.throws(
    () => {
      Db.createRelation('countries', 'cars')
    },
    { message: 'A relationship between this tables already exists' }
  )
})
// test('Table:add - should add data to table', function (t) {
//   t.plan(2)
//   const Db = new TinyJsDb()
//   const cars = Db.createTable('cars')

//   const newCar = { name: 'Ferrari', country: 'Italy' }
//   cars.push({ name: 'Porsche', country: 'Germany' })
//   cars.push(newCar)

//   t.equal(cars.length, 2)
//   t.equal(
//     JSON.stringify(cars),
//     '[{"name":"Porsche","country":"Germany"},{"name":"Ferrari","country":"Italy"}]'
//   )
// })
