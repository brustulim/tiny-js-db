'use strict'
const test = require('tape')
const TinyJsDb = require('..')

const PERSONS = 'persons'
const COUNTRIES = 'countries'

function createFakePersonsData (persons) {
  persons.insertMany([
    { name: 'John', age: 28 },
    { name: 'Claire', age: 37 },
    { name: 'Peter', age: 17 },
    { name: 'Clark', age: 32 }
  ])
}

function createFakeCountriesData (countries) {
  countries.insertMany([
    { name: 'Scotland', local: 'EU' },
    { name: 'Brazil', local: 'SA' },
    { name: 'EUA', local: 'NA' },
    { name: 'Japan', local: 'AS' },
    { name: 'France', local: 'EU' }
  ])
}

function createFakeDb () {
  const db = new TinyJsDb()
  const persons = db.createTable(PERSONS)
  const countries = db.createTable(COUNTRIES)
  db.createRelationship(persons, countries)

  createFakePersonsData(persons)
  createFakeCountriesData(countries)

  return { db, persons, countries }
}

test('Record:addRelation - should add a relation between two tables records', function (assert) {
  assert.plan(3)

  const { persons, countries } = createFakeDb()

  const person = persons.getById(2, [COUNTRIES])
  const countryA = countries.getById(2)
  const countryB = countries.getById(4)
  const countryC = countries.getById(0)
  persons.addRelation(person, COUNTRIES, countryA)
  persons.addRelation(person, COUNTRIES, countryB)
  persons.addRelation(person, COUNTRIES, countryC)

  assert.deepEqual(
    persons.getById(2, [COUNTRIES]),
    {
      name: 'Peter',
      age: 17,
      _id: 2,
      countries: [
        { name: 'EUA', local: 'NA', _id: 2 },
        { name: 'France', local: 'EU', _id: 4 },
        { name: 'Scotland', local: 'EU', _id: 0 }
      ]
    },
    'person should be linked to three countries'
  )

  assert.deepEqual(
    countries.getById(2, [PERSONS]),
    {
      name: 'EUA',
      local: 'NA',
      _id: 2,
      persons: [{ name: 'Peter', age: 17, _id: 2 }]
    },
    'Country 2 - EUA should be linked to person'
  )

  assert.deepEqual(
    countries.getById(4, [PERSONS]),
    {
      name: 'France',
      local: 'EU',
      _id: 4,
      persons: [{ name: 'Peter', age: 17, _id: 2 }]
    },
    'Country 4 - France should be linked to person'
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent local record id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()

  assert.throws(
    () => {
      persons.addRelation(99, COUNTRIES, 2)
    },
    { message: 'There is no record with given id <99>' }
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent foreign record id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()

  assert.throws(
    () => {
      persons.addRelation(2, COUNTRIES, 99)
    },
    { message: 'There is no record with given id <99>' }
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent local record - without _id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()
  const personNotInDatabase = { name: 'Lolo', age: 87 }

  assert.throws(
    () => {
      persons.addRelation(personNotInDatabase, COUNTRIES, 2)
    },
    { message: 'Cannot get data. The given record has no _id' }
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent local record - with unknown _id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()
  const personNotInDatabase = { _id: 22, name: 'Lolo', age: 87 }

  assert.throws(
    () => {
      persons.addRelation(personNotInDatabase, COUNTRIES, 2)
    },
    { message: 'There is no record with given id <22>' }
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent foreign record - without _id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()
  const countryNotInDatabase = { name: 'Spain', local: 'EU' }

  assert.throws(
    () => {
      persons.addRelation(2, COUNTRIES, countryNotInDatabase)
    },
    { message: 'Cannot get data. The given record has no _id' }
  )
})

test('Record:addRelation - should throw an error if tries to add relation to a inexistent foreign record - with unknown _id', function (assert) {
  assert.plan(1)

  const { persons } = createFakeDb()
  const countryNotInDatabase = { _id: 33, name: 'Spain', local: 'EU' }

  assert.throws(
    () => {
      persons.addRelation(3, COUNTRIES, countryNotInDatabase)
    },
    { message: 'There is no record with given id <33>' }
  )
})
