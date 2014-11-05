'use strict';

var core = require('../core');

require('./common');

var torrent, firstPart, raw;

core.on('setup', function (data) {
  torrent = data;
  firstPart = undefined;
  raw = undefined;
});

core.on('part', function (part) {
  if(!part.match) {
    return;
  }

  // locate the first part
  if(!firstPart || part.match.index < firstPart.index) {
    firstPart = part.match;
  }
});

core.on('common', function () {
  var raw = firstPart ? torrent.name.substr(0, firstPart.index).split('(')[0] : torrent.name;
  var clean = raw;

  // clean up title
  if(raw.indexOf(' ') === -1 && raw.indexOf('.') !== -1) {
    clean = clean.replace(/\./g, ' ');
  }

  clean = clean.replace(/\($/, '').trim();

  core.emit('part', {
    name: 'title',
    raw: raw,
    clean: clean
  });
});
