'use strict';

var core = require('../core');

var torrent, raw;

core.on('setup', function (data) {
  torrent = data;
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
  var clean, groupPattern;

  // clean up excess
  clean = raw.replace(/(^[-\. ]+)|[\(\)\/]|([-\. ]+$)/g, '');
  clean = clean.split(/\.\.+| +/).filter(Boolean);

  if(clean.length !== 0) {
    groupPattern = clean[clean.length - 1] + '$';

    if(torrent.name.match(new RegExp(groupPattern))) {
      core.emit('late', {
        name: 'group',
        clean: clean.pop()
      });
    }
  }

  if(clean.length !== 0) {
    core.emit('part', {
      name: 'excess',
      raw: raw,
      clean: clean.length === 1 ? clean[0] : clean
    });
  }
});
