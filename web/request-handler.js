var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var _ = require('underscore');
var fs = require('fs');
// require more modules/folders here!

var postHandling = function(indexFile, data) {
  fs.appendFile(indexFile, data, function(error) {
    if (!error) {
      console.log('Got inside append File');
    } else {
      console.log('Error');
    }
  });
};


exports.handleRequest = function (request, response) {
  var headers = helpers.headers;
  var filePath = archive.paths.siteAssets;
  var archiveList = archive.paths.list;
  var archivePath = archive.paths.archivedSites;
  
  console.log('Request URL ', request.url);
  
  headers['Content-Type'] = 'text/html';
  

  if (request.method === 'GET') {
    helpers.serveAssets(response, request.url, function(err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, headers);
        response.end();
      } else {
        response.writeHead(200, headers);
        response.write(data);
        response.end();
      }
    });
 
  } else if (request.method === 'POST') {
    var body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', function() {
      var val = Buffer.concat(body).toString();
      var val = val.substr(4, val.length);
      archive.isUrlInList(val, function(boolean) {
        if (!boolean && val !== '') {
          archive.addUrlToList(val, function() {
            fs.readFile(filePath + '/loading.html', function(error, loading) {
              response.end(Buffer(loading).toString());
            });
          });
        } else {
          fs.readFile(archivePath + '/' + val, function(error, data) {
            if (error) {
              response.writeHead(302, headers);
              fs.readFile(filePath + '/loading.html', function(error, loading) {
                response.end(Buffer(loading).toString());
              });
            } else {
              response.writeHead(302, headers);
              response.end(Buffer(data).toString());
            } 
          });
        }
      });
    });
  }
};