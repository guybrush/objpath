# objpath

create/access objects with a key-string

``` javascript
var objpath = require('objpath')
objpath(this, 'foo.bar', 'blub')
assert.equal(this.foo.bar,'blub')
assert.equal(objpath(this,'foo.bar'),'blub')

```