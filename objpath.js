;(function(){

if (module && module.exports && module.exports) module.exports = objpath
else (function () { return this })().objpath = objpath

/**
 * create/access objects with a key-string
 *
 *     objpath(this, 'foo.bar', 'blub')
 *     assert.equal(this.foo.bar,'blub')
 *     assert.equal(objpath(this,'foo.bar'),'blub')
 *
 * @param  {Object} scope
 * @param  {String} key-string (e.g. 'a.b.c.d')
 * @param  {Object} value to store in key (optional)
 * @return {Object} if value-param is given it will return
 *                  the object, otherwise it will return the value
 *                  of the selected key
 */
function objpath(obj, keyString, value) {
  if (arguments.length<2) return false
  keyString = keyString+''
  var keys = keyString.split('.') || [keyString]
  if (obj[keys[0]] === undefined) obj[keys[0]] = {}
  var temp = obj[keys[0]]
    , keys = keys.slice(1)

  if (value === undefined) { // get data
    var value = temp
    for (var i=0, len=keys.length; i<len; i++) {
      value = value[keys[i]]
    }
    return value
  } else { // set data
    if (keys.length==0) {
      obj[keyString] = value
      return obj
    }
    for (var i=0, len=keys.length; i<len; i++) {
      if (i==(len-1)) {
        temp[keys[i]] = value
      } else {
        temp = temp[keys[i]]
      }
    }
    return obj
  }
}

})()

