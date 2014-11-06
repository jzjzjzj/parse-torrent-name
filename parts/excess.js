'use strict';

var core = require('../core');

var torrent, raw, groupRaw;

core.on('setup', function (data) {
  torrent = data;
  raw = torrent.name;
  groupRaw = '';
});

core.on('part', function (part) {
  if(part.name === 'excess') {
    return;
  }
  else if(part.name === 'group') {
    groupRaw = part.raw;
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
    groupPattern = clean[clean.length - 1] + groupRaw + '$';

    if(torrent.name.match(new RegExp(groupPattern))) {
      core.emit('late', {
        name: 'group',
        clean: clean.pop() + groupRaw
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
