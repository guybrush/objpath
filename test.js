var assert = require('assert')
  , op = require('./')
  
module.exports =
{ api:
  { 'op({},"a","a")': function() {
      var result = op({},'a','a')
      assert.deepEqual(result,{a:'a'})
    } 
  , 'op(obj,"a.ab","ab")': function() {
      var obj = {a:{aa:'aa'}}
      var result = op(obj,'a.ab','ab')
      assert.deepEqual(result,{a:{aa:'aa',ab:'ab'}})
      assert.deepEqual(obj,result)
    }
  , 'falsy values': function() {
      var obj = {a:{aa:undefined}}
      var result = op(obj,'a.ab',0)
      var result = op(obj,'a.ac',false)
      assert.deepEqual(result,{a:{aa:undefined,ab:0,ac:false}})
      assert.deepEqual(obj,result)
    }
  }
, bench:
  { 'flat': 
    { 'eval': function(done) {
        var i = 10000
        var x = {}
        while(i--) eval('x['+i+'] = '+i)
        assert.equal(x['0'],0)
        done()
      }
    , 'op': function(done) {
        var i = 10000
        var x = {}
        while(i--) op(x,i,i)
        assert.equal(x['0'],0)
        done()
      }
    }
  , 'deep':
    { 'eval': function(done) {
        var i = 10000
        var x = {a:{aa:{aaa:{aaaa:1}}},b:{ba:{baa:0}}}
        while(i--) eval('x.a.aa.aaa.aaaa = '+i)
        assert.equal(x.a.aa.aaa.aaaa,0)
        done()
      }
    , 'op': function(done) {
        var i = 10000
        var x = {a:{aa:{aaa:{aaaa:1}}},b:{ba:{baa:0}}}
        while(i--) op(x,'a.aa.aaa.aaaa',i)
        assert.equal(x.a.aa.aaa.aaaa,0)
        done()
      }
    }
  }
}
