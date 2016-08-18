// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var helpers = require('../web/http-helpers.js');
var archive = require('../helpers/archive-helpers.js');

var DownloadUrlsAtOnce = function() {
  archive.readListOfUrls( function(urlArray) {
    console.log(urlArray);
    urlArray.forEach(function(url) {
      archive.isUrlArchived(url, function(isArchived) {
        console.log('archive boolean value: ', isArchived);
        if (!isArchived) {
          http.get('http://' + url, function(response) {
            var body = [];
            //push data chunk to body array, then...
            response.on('data', function(chunk) {
              body.push(chunk);
            }).on('end', function() {
              //convert buffer to useable data
              var data = Buffer(body.join()).toString();
              console.log(data);
              //call fs.writeFile to create a new file store the corresponding HTML.
              fs.writeFile(archive.paths.archivedSites + '/' + url, data, function(err) {
                console.log('done');
              });
            });
          });
          console.log('as urls are being pushed ', url);
        }
      });
    });
  });
  // console.log(archive);
};
DownloadUrlsAtOnce();