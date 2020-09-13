## Classes

<dl>
<dt><a href="#TinyJsDb">TinyJsDb</a></dt>
<dd><p>Main tiny-js-db database controller</p>
</dd>
<dt><a href="#Table">Table</a></dt>
<dd><p>the controller that handles the database tables</p>
</dd>
</dl>

<a name="TinyJsDb"></a>

## TinyJsDb
Main tiny-js-db database controller

**Kind**: global class  

* [TinyJsDb](#TinyJsDb)
    * [new TinyJsDb([opts])](#new_TinyJsDb_new)
    * [.tables](#TinyJsDb+tables) ⇒ <code>Array.&lt;string&gt;</code>
    * [.relationships](#TinyJsDb+relationships) ⇒ <code>Array.&lt;Array&gt;</code>
    * [.createTable(name)](#TinyJsDb+createTable) ⇒ <code>object</code>
    * [.getTable(table)](#TinyJsDb+getTable) ⇒ <code>object</code>
    * [.tableExists(name)](#TinyJsDb+tableExists) ⇒ <code>boolean</code>
    * [.createRelationship(tableA, tableB)](#TinyJsDb+createRelationship) ⇒ <code>object</code>
    * [.getRelationship(tableA, tableB)](#TinyJsDb+getRelationship) ⇒ <code>object</code>
    * [.relationshipExists(tableA, tableB)](#TinyJsDb+relationshipExists) ⇒ <code>boolean</code>

<a name="new_TinyJsDb_new"></a>

### new TinyJsDb([opts])
Creates a new database instance and provide functions to manage the database.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>object</code> |  | Database configurations |
| [opts.autoGenerateIds] | <code>boolean</code> | <code>true</code> | Set if ids will be generated automatically |

**Example**  
```js
const TinyJsDb = require('tiny-js-db')
const db = new TinyJsDb()
```
<a name="TinyJsDb+tables"></a>

### db.tables ⇒ <code>Array.&lt;string&gt;</code>
Return all tables name from the database

**Kind**: instance property of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>Array.&lt;string&gt;</code> - array of strings containing the tables name  
**Example**  
```js
const tables = db.tables
console.log(tables)
// ['cars','countries']
```
<a name="TinyJsDb+relationships"></a>

### db.relationships ⇒ <code>Array.&lt;Array&gt;</code>
Return the relationships from the database

**Kind**: instance property of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>Array.&lt;Array&gt;</code> - array of tables instance pairs for each relationship on database  
**Example**  
```js
const relationships = db.relationships
console.log(relationships)
// [
//   [ table1, table2 ],
//   [ table1, table3 ]
// ]
```
<a name="TinyJsDb+createTable"></a>

### db.createTable(name) ⇒ <code>object</code>
Creates a new table on database

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>object</code> - table instance  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the table |

**Example**  
```js
db.createTable('cars')
// if you want the new table instance
const cars = db.createTable('cars')
```
<a name="TinyJsDb+getTable"></a>

### db.getTable(table) ⇒ <code>object</code>
Return a table instance

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>object</code> - table instance  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |

**Example**  
```js
const cars db.getTable('cars')
```
<a name="TinyJsDb+tableExists"></a>

### db.tableExists(name) ⇒ <code>boolean</code>
Check if a table exists in the database

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>boolean</code> - true if the table exists and false if not  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | An string containing the table name |

**Example**  
```js
if(db.tableExists('cars')){}
```
<a name="TinyJsDb+createRelationship"></a>

### db.createRelationship(tableA, tableB) ⇒ <code>object</code>
Create a relationship between two tables
- The order of the tables are not important
- If you try to create a relationship that already exists, an error will throw

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>object</code> - The created relationship  

| Param | Type | Description |
| --- | --- | --- |
| tableA | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |
| tableB | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |

**Example**  
```js
db.createRelationship('cars', 'countries')
// or
db.createRelationship(cars, 'countries')
// or
db.createRelationship(cars, countries)
// or
const newRelation = db.createRelationship(cars, countries)
```
<a name="TinyJsDb+getRelationship"></a>

### db.getRelationship(tableA, tableB) ⇒ <code>object</code>
Get a relationship
- The order of the tables are not important

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>object</code> - The relationship  

| Param | Type | Description |
| --- | --- | --- |
| tableA | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |
| tableB | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |

**Example**  
```js
const relation = db.getRelationship('cars', 'countries')
// or
const relation = db.getRelationship('countries', 'cars')
// or
const relation = db.getRelationship(cars, 'countries')
// or
const relation = db.getRelationship(cars, countries)
```
<a name="TinyJsDb+relationshipExists"></a>

### db.relationshipExists(tableA, tableB) ⇒ <code>boolean</code>
Check if a relationship between two tables exist
- The order of the tables are not important

**Kind**: instance method of [<code>TinyJsDb</code>](#TinyJsDb)  
**Returns**: <code>boolean</code> - true if the relationship exists and false if not  

| Param | Type | Description |
| --- | --- | --- |
| tableA | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |
| tableB | <code>string</code> \| <code>object</code> | An string containing the table name or an instance of a Table |

**Example**  
```js
if(db.relationshipExists('cars','countries')){}
// or
if(db.relationshipExists('countries', 'cars')){}
// or
if(db.relationshipExists(cars,'countries')){}
// or
if(db.relationshipExists(cars,countries)){}
```
<a name="Table"></a>

## Table
the controller that handles the database tables

**Kind**: global class  

* [Table](#Table)
    * [new Table(db, tableName)](#new_Table_new)
    * [.getById(id, [relations])](#Table+getById) ⇒ <code>object</code>

<a name="new_Table_new"></a>

### new Table(db, tableName)
Contains the logic for maintaining the session.
An instance of this class is placed on the app object where it can be accessed


| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | The TinyJsDb instance |
| tableName | <code>string</code> | the table name |

<a name="Table+getById"></a>

### table.getById(id, [relations]) ⇒ <code>object</code>
Get a record by its id

**Kind**: instance method of [<code>Table</code>](#Table)  
**Returns**: <code>object</code> - - The record  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | The desired record id |
| [relations] | <code>array</code> | <code>[]</code> | an array containing the tables name of desired relations |

