'use strict';

var fs = require('fs'),
  express = require('express'),
  config = require('./config/default.json'),
  options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css', 'js', 'png', 'jpg'],
    index: './html/index.html',
    maxAge: '1d',
    redirect: false,
    setHeaders: function(res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  };




var initStatiqueServer = function() {
  var app = express();
  app.use(express.static('public', options));
  app.get('/config.js', function(req, res, next) {
    next();
  }, function(req, res, next) {
      res.set('Content-Type', 'text/javascript');
      res.send('var config='+JSON.stringify(config));
  });
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  server.listen(config.server.port);

}
initStatiqueServer();
