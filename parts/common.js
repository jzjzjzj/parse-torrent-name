'use strict';

var core = require('../core');

/**
 * Pattern should contain either none or two capturing groups.
 * In case of two groups - 1st is raw, 2nd is clean.
 */
var patterns = {
  season: /(S?([0-9]{1,2}))[Ex]/,
  episode: /([Ex]([0-9]{2})[^0-9])/,
  year: /(\(?((?:19|20)[0-9]{2})\)?)/,
  resolution: /[0-9]{3,4}p/,
  quality: /(?:PPV\.)?HDTV|HDCAM|B[rR]Rip|TS|(?:PPV )?WEB-?DL(?: DVDRip)?|HDRip|DVDRip|DVDRiP|DVDRIP|CamRip|W[EB]BRip/,
  codec: /xvid|x264|h\.?264/i,
  group: /(- ?([^-]+(?:-[^-]+-$)?))$/,
  region: /R[0-9]/,
  extended: /EXTENDED/,
  hardcoded: /HC/
};
var types = {
  season: 'integer',
  episode: 'integer',
  year: 'integer',
  extended: 'boolean',
  hardcoded: 'boolean'
};
var torrent;

core.on('setup', function (data) {
  torrent = data;
});

core.on('start', function() {
  var key, match, index, clean;

  for(key in patterns) {
    if(patterns.hasOwnProperty(key)) {
      if(!(match = torrent.name.match(patterns[key]))) {
        continue;
      }

      index = {
        raw:   match[1] ? 1 : 0,
        clean: match[1] ? 2 : 0
      };

      if(types[key] && types[key] === 'boolean') {
        clean = true;
      }
      else {
        clean = match[index.clean];

        if(types[key] && types[key] === 'integer') {
          clean = parseInt(clean, 10);
        }
      }

      core.emit('part', {
        name: key,
        match: match,
        raw: match[index.raw],
        clean: clean
      });
    }
  }

  core.emit('common');
});
