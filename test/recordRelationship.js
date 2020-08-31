'use strict'
const test = require('tape')
const TinyJsDb = require('..')

function createFakePersonsData (persons) {
  persons.addMany([
    { name: 'John', age: 28 },
    { name: 'Claire', age: 37 },
    { name: 'Peter', age: 17 },
    { name: 'Clark', age: 32 }
  ])
}

function createFakeCountriesData (countries) {
  countries.addMany([
    { name: 'Scotland', local: 'EU' },
    { name: 'Brazil', local: 'SA' },
    { name: 'EUA', local: 'NA' },
    { name: 'Japan', local: 'AS' },
    { name: 'France', local: 'EU' }
  ])
}

test('Table:addRelation - should add a relation between two tables records', function (assert) {
  const PERSONS = 'persons'
  const COUNTRIES = 'countries'

  const db = new TinyJsDb()
  const persons = db.createTable(PERSONS)
  const countries = db.createTable(COUNTRIES)
  db.createRelationship(persons, countries)

  createFakePersonsData(persons)
  createFakeCountriesData(countries)

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
  assert.end()
})
