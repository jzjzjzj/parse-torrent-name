'use strict';

var core = require('../core');

var raw;

core.on('setup', function (torrent) {
  raw = torrent.name;
});

core.on('part', function (part) {
  if(part.name === 'excess') {
    return;
  }

  // remove known parts from the excess
  raw = raw.replace(part.raw, '');
});

core.on('end', function () {
  var clean;

  // clean up excess
  clean = raw.replace(/(^[-\. ]+)|[\(\)\/]|(^[-\. ]+$)/g, '');
  clean = clean.split(/\.\.+| +/).filter(Boolean);

  if(clean.length !== 0) {
    core.emit('part', {
      name: 'excess',
      raw: raw,
      clean: clean
    });
  }
});
