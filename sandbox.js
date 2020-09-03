const TinyJsDb = require('./')

// create a new database instance
const Db = new TinyJsDb()

// create tables
const heroes = Db.createTable('heroes')
const abilities = Db.createTable('abilities')

// set relationships
Db.createRelationship(heroes, abilities)

// add record to database
heroes.insert({ name: 'Thor', age: 437 })
heroes.insert({ name: 'Hulk', age: 40 })
// add record and get its instance
const ironMan = heroes.insert({ name: 'Iron Man', age: 42 })

abilities.insert({ type: 'Super force' })
abilities.insert({ type: 'Resistance' })
abilities.insert({ type: 'Money' })
abilities.insert({ type: 'Thunder' })

// retrieve a record by filter
const thor = heroes.getFirst({ name: 'Thor' })
// retrieve a record by id
const thunder = abilities.getById(3)

// add a relation between records - using its instances
heroes.addRelation(thor, 'abilities', thunder)

// add a relation between records - using its ids
heroes.addRelation(1, 'abilities', 1)
heroes.addRelation(1, 'abilities', 0)

// get a record with its relationships
const item = heroes.getById(1, ['abilities'])
console.log(item)
/*
{
  _id: 1,
  name: 'Hulk',
  age: 40,
  abilities: [ { type: 'Resistance', _id: 1 }, { type: 'Super force', _id: 0 } ]
}
*/

const myHeroes = heroes.getAll()
console.log(myHeroes)
/*
[
  { name: 'Thor', age: 437, _id: 0 },
  { name: 'Hulk', age: 40, _id: 1 },
  { name: 'Iron Man', age: 42, _id: 2 }
]
*/

// const cars = Db.createTable('cars')
// const newCar = { name: 'Ferrari', country: 'Italy' }
// cars.insert({ name: 'Porsche', country: 'Germany' })
// cars.insert(newCar)
// console.log(cars.name, ' - length: ', cars.length)

// const myCars = cars.getAll()
// console.log('myCars', myCars)

// console.log('-----------------------------------------------------')
// cars.updateFirstWhere({ name: 'Porsche' }, { name: '147', changed: true })
// const my3 = cars.getAll()

// console.log('myCars', myCars)
// console.log('my3', my3)
