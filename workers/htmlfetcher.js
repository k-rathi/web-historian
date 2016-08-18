// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var helpers = require('../http-helpers.js');
var archive = require('.../archives/helpers/archive-helpers.js');

(function() {
  var urlsToBeDownloaded = [];
  archive.readListOfUrls(function(urlArray) {
    urlArray.forEach(function(url) {
      archive.isUrlArchived(url, function(isArchived) {
        if (!isArchived) {
          urlsToBeDownloaded.push(url);
        }
      });
    });
  });
  archive.downloadUrls(urlsToBeDownloaded);
})();