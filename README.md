# tiny-js-db

> A tiny and fast in memory database with relationships support focused in simplicity, small footprint and lib size (for browser and node js)

## What it is?

Tiny-js-db was born from a need for working with large relational data in memory, where each byte of memory saved matters, GC must works masterfully, index are essential for performance. all with the minimum possible footprint.
Then tiny-js-db was created to achieve these goals with a small boilerplate.

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
