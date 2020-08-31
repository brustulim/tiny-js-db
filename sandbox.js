const TinyJsDb = require('./')

const Db = new TinyJsDb()
const wheels = Db.createTable('wheels')
wheels.add({ name: '13', size: 12.9 })
wheels.add({ name: '18', size: 18.4 })

const cars = Db.createTable('cars')
const newCar = { name: 'Ferrari', country: 'Italy' }
cars.add({ name: 'Porsche', country: 'Germany' })
cars.add(newCar)
console.log(cars.name, ' - length: ', cars.length)

const myCars = cars.getAll()
console.log('myCars', myCars)

console.log('-----------------------------------------------------')
cars.updateFirstWhere({ name: 'Porsche' }, { name: '147', changed: true })
const my3 = cars.getAll()

console.log('myCars', myCars)
console.log('my3', my3)
