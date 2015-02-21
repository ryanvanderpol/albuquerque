/**
 * Albuquerque
 * A simple, A/B testing framework for Express.js
 * https://github.com/ryanvanderpol/albuquerque
 *
 * Copyright (c) 2015 Ryan Vanderpol
 * Licensed under the MIT license.
 */

 module.exports = function(options) {

    var options = options || {};

    var viewRootA = options.viewRootA || '_a';
    var viewRootB = options.viewRootB || '_b';

    
    return function(req, res, next) {

        if(!req.session){
            return next(new Error('Albuquerque requires express-session!'));
        }

        var sess = req.session.albuquerque || { };
        if(!sess.set){
            // Randomly assign the user to either the A or B set
            sess.set = Math.floor((Math.random() * 2) + 1) == 1 ? 'A' : 'B';
            req.session.albuquerque = sess;
        }

        var r = res.render;
        // override the existing response render
        res.render = function(view, options, fn){

            var app = req.app;
            var args = arguments;
            var setRoot = sess.set === 'A' ? viewRootA + '/' : viewRootB + '/';
            var setPath = setRoot + view;

            // testing to see if there's a set view
            // there are probably faster ways to do this
            var vx = new (app.get('view'))(setPath, {
                  defaultEngine: app.get('view engine'),
                  root: app.get('views'),
                  engines: app.engines
                });

            if(vx.path){
                // if we found a view, alter the arguments with the new view path
                args[0] = setPath;
            }

            r.apply(this, args);
        };

        next();
    }
    
};
