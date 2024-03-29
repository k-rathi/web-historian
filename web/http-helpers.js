var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset, callback) {
  var url = '/';
  var headers = exports.headers;
  if (asset === '/') {
    headers['Content-Type'] = 'text/html';
    url += '/index.html';
  } else if (asset === '/styles.css') {
    headers['Content-Type'] = 'text/css';
    url += asset;
  } else if (asset === '/loading.html') {
    headers['Content-Type'] = 'text/js';
    url += asset;
  }
  console.log(archive.paths.siteAssets + url);
  fs.readFile(archive.paths.siteAssets + url, callback);
};





  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)




// As you progress, keep thinking about what helper functions you can put here!
