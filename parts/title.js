'use strict';

var core = require('../core');

require('./common');

var torrent, start, end, raw;

core.on('setup', function (data) {
  torrent = data;
  start = 0;
  end = undefined;
  raw = undefined;
});

core.on('part', function (part) {
  if(!part.match) {
    return;
  }

  if(!end || part.match.index < end) {
    end = part.match.index;
  }
});

core.on('common', function () {
  var raw = end ? torrent.name.substr(start, end - start).split('(')[0] : torrent.name;
  var clean = raw;

  // clean up title
  if(raw.indexOf(' ') === -1 && raw.indexOf('.') !== -1) {
    clean = clean.replace(/\./g, ' ');
  }

  clean = clean.replace(/_/g, ' ');
  clean = clean.replace(/([\(_]|- )$/, '').trim();

  core.emit('part', {
    name: 'title',
    raw: raw,
    clean: clean
  });
});
