function replaceObject (obj, newValues) {
  if (!obj || !newValues) {
    throw new Error(
      'The object and newValues must be provided to replaceObject'
    )
  }
  Object.keys(obj).forEach(key => delete obj[key])
  return updateObject(obj, newValues)
}

function updateObject (obj, newValues) {
  if (!obj || !newValues) {
    throw new Error('The object and newValues must be provided to updateObject')
  }
  Object.keys(newValues).forEach(key => (obj[key] = newValues[key]))
  return obj
}

module.exports = { replaceObject, updateObject }
