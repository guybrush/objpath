var assert = require('assert')
var op = require('./')

var result = op(this, 'foo.bar', 'blub')
assert.equal(this.foo.bar,'blub')
assert.equal(op(this,'foo.bar'),'blub')

var result = op({},'a','a')
assert.deepEqual(result,{a:'a'})

var obj = {a:{aa:'aa'}}
var result = op(obj,'a.ab','ab')
assert.deepEqual(result,{a:{aa:'aa',ab:'ab'}})
assert.deepEqual(obj,result)

var obj = {a:{aa:undefined}}
var result = op(obj,'a.ab',0)
var result = op(obj,'a.ac',false)
assert.deepEqual(result,{a:{aa:undefined,ab:0,ac:false}})
assert.equal(op(obj,'a.aa'),undefined)
assert.equal(op(obj,'a.ac'),false)
assert.deepEqual(obj,result)

