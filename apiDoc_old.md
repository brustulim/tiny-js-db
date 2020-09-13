### Instantiate the database object

```javaScript
const Db = new TinyJsDb()
```

---

### Create a table in the database

```javascript
Db.createTable(tableName);
// or
const tableInstance = Db.createTable(tableName);
```

#### Input Parameters

| parameter | type   | description                     |
| --------- | ------ | ------------------------------- |
| tableName | String | The name of the table to create |

#### Output

| type   | description                           |
| ------ | ------------------------------------- |
| object | Object containing the table reference |

---

### Creates a relation between two tables.

```javascript
Db.createRelationship(tableA, tableB);
```

#### Input Parameters

| parameter | type   | description               |
| --------- | ------ | ------------------------- |
| tableA    | String | The name of a table       |
| tableB    | String | The name of another table |

---

### Insert a new record into a table

```javascript
<table>.insert(record)
```

#### Input Parameters

| parameter | type     | description                   |
| --------- | -------- | ----------------------------- |
| table     | Instance | A table instance              |
| record    | Object   | An object with the new record |

#### Output

| type   | description                           |
| ------ | ------------------------------------- |
| object | Object containing the table reference |
