# tiny-js-db

> A tiny and fast in memory database with relationships support focused in simplicity, small footprint and lib size (for browser and node js)

## What it is?

Tiny-js-db was born from a need for working with large relational data in memory where each byte of memory saved matters, GC must works masterfully and indexes are essential for performance... all with the smallest footprint and boilerplate possible.

## Installation

There are 3 ways to install tiny-js-db:

#### Local file in your project:

Download the file [tiny-js-db.min.js](https://github.com/brustulim/tiny-js-db/blob/master/tiny-js-db.min.js), add it to your project folder and add a script tag into your html or js file:

```html
<script src="tiny-js-db.min.js"></script>
```

#### Hosted in a CDN:

[![](https://data.jsdelivr.com/v1/package/npm/tiny-js-db/badge)](https://www.jsdelivr.com/package/npm/tiny-js-db)

Just add a script tag pointing to a CDN :

```html
<script src="https://cdn.jsdelivr.net/npm/tiny-js-db@latest/tiny-js-db.min.js"></script>
```

#### Install as a npm dependency:

```bash
npm install tiny-js-db --save
```

## Usage Example

```javascript
const TinyJsDb = require('./')

// create a new database instance
const Db = new TinyJsDb()

// create tables
const heroes = Db.createTable('heroes')
const abilities = Db.createTable('abilities')

// set relationships
Db.createRelationship(heroes, abilities)

// add records to the database
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

// relations can be set from both sides
abilities.addRelation(2, 'abilities', ironMan)

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
```

## Important

IMPORTANT: This project is in the early stages of development, so I suggest not use this library in a production or serious project/product.
The first stable version will be released soon, including basic documentation and usage examples (in this readme)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
One point that is very easy to contribute is chose a function, do some benchmarking and change the code to accomplish the most performance possible.

Please make sure to update tests as appropriate.

## Modules / Thanks!

| module                 | description                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| [lodash/fp][lodash/fp] | Great library that provides many useful functionalities to deal with arrays, objects, collections, etc. use |

[lodash/fp]: https://github.com/lodash/lodash

> for now, lodash/fp is the only external dependency in this project.

### License

MIT. Copyright (c) [Herminio Brustulim](https://github.com/brustulim).
