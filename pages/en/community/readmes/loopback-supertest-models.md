# loopback-supertest-models

## Setup

```
  var app = require('./server/server.js');
  var models = require('loopback-supertest-models')(app);
```

## Example

using supertest's `end` function 

```javascript
describe('GET /api/pokemon', function() {
  it('respond with pokemon', function(done) {
    return models.Pokemon
      .find()
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
```

You can also use promises

```javascript
describe('GET /api/pokemon/?filter={"name": "pikachu"}', function() {
  it('respond with pikachu', function() {
    return models.Pokemon
      .find({ "name": "pikachu"})
      .expect(200)
      .then(response => {
          assert(response.body.name, 'pikachu')
      })
  });
});
```

## Spy

Spy on when a remote method is called 

```javascript
describe('GET /api/pokemon/?filter={"name": "pikachu"}', function() {
  it('respond with pikachu', function() {
    models.Pokemon.on('find', function(ctx) {
      console.log('on', ctx.filter);
    })
    models.Pokemon.once('find', function(ctx) {
      console.log('once', ctx.filter);
    })
    return models.Pokemon
      .find()
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
```
License: MIT
