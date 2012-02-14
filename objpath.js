;(function(){
    
if (module && module.exports && module.exports) module.exports = objpath
else (function () { return this })().objpath = objpath

/**
 * create/access objects with a key-string
 *
 * with eval():                   with objpath():
 * -----------------------------  ----------------------------------
 * var keyString = 'json.data'    var keyString = 'json.data'
 *   , value     = 'a value';       , value     = 'a value';
 * eval(keyString+' = '+value);   objpath(this, keyString, value);
 * alert(eval(keyString));        alert(objPath(this, keyString));
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
      if (value[keys[i]] === undefined) return false
      value = value[keys[i]]
    }
    return value
  } else { // set data
    if (keys.length==0) {
      obj[keyString] = value
      //console.log(obj)
      return obj
    }
    for (var i=0, len=keys.length; i<len; i++) {
      if (i==(len-1)) {
        temp[keys[i]] = value
      } else {
        temp[keys[i]] = temp[keys[i]] || {}
        temp = temp[keys[i]] 
      }
    }
    //console.log(obj)
    return obj
  }
}

})()
