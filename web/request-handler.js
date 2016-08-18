var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
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
  var filePath = archive.paths.siteAssets;
  var archiveList = archive.paths.list;
  var archivePath = archive.paths.archivedSites;
  if (request.method === 'POST') {
    //and it starts withs classes/messages
    if (request.url.startsWith('/')) {
      //change the status to 201
      response.writeHead(302, headers);
      var body = [];
      //listen for when there is a change in data,
      //then timestamp it and push to body.results, where we store messages
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', function() {
        var val = Buffer.concat(body).toString();
        var val = val.split('=')[1] + '\n';
        console.log('val ', val);
        // console.log(archive.paths.list);
        fs.writeFile(archiveList, _.escape(val), 'utf8', function(error) {
          console.log('successful write', val);
          console.log('archiveList', archiveList);
        });
        response.end();
      });
        // fs.open(archiveList, 'a', (error, fd) => {
        //   console.log('fd', fd);
        //   fs.appendFile(fd, body.join().toString(), function(error, fd) {
        //     console.log('fd2', fd);
        //     fs.close(fd, function(error, fd) {
        //       console.log('fd3', fd);
        //     });
        //   });
        // });
        // fs.appendFile(archiveList, body.join().toString(), function(error) {
        //   if (error) {
        //     throw error;
        //   }
        //   console.log('success!');
        // //message.createdAt = Date.now();
        // //body.results.unshift(message);
        // });
        // var url = data.toString().split('=')[1] + '\\n';
        // console.log(url, typeof url);
        // console.log('stringified ', JSON.stringify(url));
        // // console.log('json parse', typeof data.toString());
        // // console.log('url check', data.toString().url);
        // console.log(archiveList);
        

        // console.log('hello??????', json);
      //send back stringified body
    }
  } else if (request.method === 'GET') {
    // handling GET requests to local files
    // sets filePath and content type for index.html
    headers['Content-Type'] = 'text/html';
    if (request.url === '/') {
      filePath += '/index.html';
    // sets filePath/content type for javascript files
    } else if (request.url.endsWith('.js')) {
      headers['Content-Type'] = 'text/javascript';
      filePath += request.url;
    // sets filePath/content type for css files
    } else if (request.url.endsWith('.css')) {
      headers['Content-Type'] = 'text/css';
      filePath += request.url;
    } else if (request.url.includes('www.')) {
      filePath = archivePath + request.url;
      console.log('filePath reaching archive: ', filePath);
    }

    // reads file using filePath

    fs.readFile(filePath, 'utf8', function (err, contents) {
      // handles our error
      if (err) {
        response.writeHead(404, headers);
        response.end();
      // serve file contents to the client
      } else {
        response.writeHead(200, headers);
        //console.log(contents);
        response.end(contents);
      }
// res.end(archive.paths.list);
    }); 
  }


};
