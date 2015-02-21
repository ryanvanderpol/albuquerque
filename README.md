Albuquerque
=========

A simple, A/B testing framework for Express.js. ABQ is middleware that sits between your users and the Express.js rendering engine and doesn’t require you to change any of your existing code.

ABQ randomly assigns a user to either Set A or Set B and automatically swaps out any view with an available A/B view, falling back to the default view if an A/B view does not exist.  

You can use this to test the effectiveness of one view to another.

## Installation

``` shell
  npm install albuquerque --save
```

## Usage

ABQ is Express.js middleware and can be setup really simply.

``` js
var abq = require('albuquerque');
app.use(abq());
```

## Templates

ABQ overrides the express rendering engine and looks for your A/B views in `{view path}/_a/` and `{view path}/_b/`. You can override this by passing in your own roots paths.

``` js
app.use(abq({ viewRootA: 'test-views/a', viewRootB: 'test-views/b' }));
```

## Session

ABQ randomly assigns a user to either the A or B set and uses session state to store the assignment.  Make sure you initialize ABQ after your session provider.

``` js
var abq = require('albuquerque');

app.use(session({ secret: 'hiesenberg' }));
app.use(abq());
```

In your own code, you can always find out what set the user is in.

``` js

if(req.session.albuquerque.set === 'A'){
    console.log('This user is an A!');
}

```

## Release History

* 0.1.0 Initial release