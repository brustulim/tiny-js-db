'use strict'
const test = require('tape')
const TinyJsDb = require('..')

test('Relationship:create - should create a relationship trough tables name', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const cars = Db.createTable('cars')
  const countries = Db.createTable('countries')
  Db.createRelationship('cars', 'countries')

  assert.deepEqual(
    Db.relationships,
    [[cars, countries]],
    'relationship should be added to database'
  )
})

test('Relationship:create - should create a relationship trough tables references', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const a = Db.createTable('tableA')
  const b = Db.createTable('tableB')
  Db.createRelationship(a, b)

  assert.deepEqual(
    Db.relationships,
    [[a, b]],
    'relationship should be added to database'
  )
})

test('Relationship:create - should create a relationship trough tables ignoring the parameters order', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  const a = Db.createTable('tableA')
  const b = Db.createTable('tableB')
  Db.createRelationship(b, a)

  assert.deepEqual(
    Db.relationships,
    [[a, b]],
    'relationship should be added to database'
  )
})

test('Relationship:create - should throw an error if tries to create a duplicated relationship', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')
  Db.createTable('countries')

  Db.createRelationship('cars', 'countries')

  assert.throws(
    () => {
      Db.createRelationship('cars', 'countries')
    },
    {
      message:
        'A relationship between tables <cars> and <countries> already exists'
    }
  )
})

test('Relationship:create - should throw an error if tries to create a duplicated relationship (even when tables are informed in different order)', function (assert) {
  assert.plan(1)

  const Db = new TinyJsDb()
  Db.createTable('cars')
  Db.createTable('countries')

  Db.createRelationship('cars', 'countries')

  assert.throws(
    () => {
      Db.createRelationship('countries', 'cars')
    },
    {
      message:
        'A relationship between tables <cars> and <countries> already exists'
    }
  )
})
