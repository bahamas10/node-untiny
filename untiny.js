#!/usr/bin/env node
/**
 * untiny a URL
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 4/18/2013
 * License: MIT
 */

var http = require('http');
var url = require('url');

var uri = process.argv[2];

if (!uri) {
  console.error('usage: untiny <url>');
  process.exit(1);
}

function untiny(uri) {
  var obj = url.parse(uri);
  obj.port = 80;
  obj.method = 'HEAD';

  var req = http.request(obj, function(res) {
    var loc = res.headers.location;
    if (loc) {
      console.log(' -> %s', uri);
      untiny(loc);
    } else {
      console.log(uri);
    }
  });
  req.on('error', function(e) {
    throw e;
  });
  req.end();
}
untiny(uri);
