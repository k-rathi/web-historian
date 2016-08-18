var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var results = [];
  fs.readFile(exports.paths.list, function(err, data) {
    data = data.toString();
    data = data.split('\n');
    data.forEach(function(url) {
      results.push(url);
    });
    callback(results);
  // fs.createReadStream(exports.paths.list).pipe(data);
  // console.log(data);
  // fs.open(exports.paths.list, 'r+', function(error, fd ) {
  //   // results.push('hello');
  //   // fs.close(fd);
  //   // console.log(results);

  // //     fs.close(fd);
  // // //     // console.log('array', array);
  // // //     // console.log(data);
  // //   return results;
  // //   });
    
  // });

  });
};

exports.isUrlInList = function(url1, callback) {
  var results = [];
  fs.readFile(exports.paths.list, function(err, data) {
    data = data.toString();
    data = data.split('\n');
    data.forEach(function(url) {
      results.push(url);
    });
    console.log(results);
    var bool;
    console.log('results', results);
    if (results.indexOf(url1) === -1) {
      bool = false;
    } else { bool = true; }
    callback(bool);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function(err) {
    callback();
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
