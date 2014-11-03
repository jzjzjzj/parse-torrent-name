var patterns = {
  season: /S?([0-9]{1,2})[Ex]/,
  episode: /[Ex]([0-9]{2})[^0-9]/,
  year: /\(?((?:19[0-9]|20[01])[0-9])\)?/,
  resolution: /[0-9]{3,4}p/,
  quality: /(?:PPV\.)?HDTV|HDCAM|B[rR]Rip|TS|(?:PPV )?WEB-?DL(?: DVDRip)?|H[dD]Rip|DVDRip|DVDRiP|DVDRIP|CamRip|W[EB]BRip/,
  codec: /xvid|x264|h\.?264/i,
  group: /- ?([^-]+(?:-[^-]+-$)?)$/,
  region: /R[0-9]/,
  extended: /EXTENDED/,
  hardcoded: /HC/,
  proper: /PROPER/
};

module.exports = function (name) {
  var matches,
    key,
    target,
    parts = {
      excess: name
    },
    lowestIndex = 999;

  // finds properties
  matches = {
    season: name.match(patterns.season),
    episode: name.match(patterns.episode),
    year: name.match(patterns.year),
    resolution: name.match(patterns.resolution),
    quality: name.match(patterns.quality),
    codec: name.match(patterns.codec),
    group: name.match(patterns.group),
    region: name.match(patterns.region),
    extended: name.match(patterns.extended),
    hardcoded: name.match(patterns.hardcoded),
    proper: name.match(patterns.proper)
  };

  if(matches.season) parts.season = parseInt(matches.season[1]);
  if(matches.episode) parts.episode = parseInt(matches.episode[1]);
  if(matches.year) parts.year = parseInt(matches.year[1]);
  if(matches.resolution) parts.resolution = matches.resolution[0];
  if(matches.quality) parts.quality = matches.quality[0];
  if(matches.codec) parts.codec = matches.codec[0];
  if(matches.group) parts.group = matches.group[1];
  if(matches.region) parts.region = matches.region[0];
  if(matches.extended) parts.extended = true;
  if(matches.hardcoded) parts.hardcoded = true;
  if(matches.proper) parts.proper = true;

  // finds title
  if(matches.season && matches.season.index < lowestIndex) lowestIndex = matches.season.index;
  if(matches.episode && matches.episode.index < lowestIndex) lowestIndex = matches.episode.index;
  if(matches.year && matches.year.index < lowestIndex) lowestIndex = matches.year.index;
  if(matches.resolution && matches.resolution.index < lowestIndex) lowestIndex = matches.resolution.index;
  if(matches.quality && matches.quality.index < lowestIndex) lowestIndex = matches.quality.index;
  if(matches.codec && matches.codec.index < lowestIndex) lowestIndex = matches.codec.index;
  if(matches.group && matches.group.index < lowestIndex) lowestIndex = matches.group.index;
  if(matches.region && matches.region.index < lowestIndex) lowestIndex = matches.region.index;
  if(matches.extended && matches.extended.index < lowestIndex) lowestIndex = matches.extended.index;
  if(matches.hardcoded && matches.hardcoded.index < lowestIndex) lowestIndex = matches.hardcoded.index;
  if(matches.proper && matches.proper.index < lowestIndex) lowestIndex = matches.proper.index;

  parts.title = name.substr(0, lowestIndex).split('(')[0];

  // extracts excess from name
  for(key in parts) {
    if(key === 'season') target = matches.season[0];
    else if(key === 'episode') target = matches.episode[0].substr(1);
    else target = parts[key];

    if(key !== 'excess') parts.excess = parts.excess.replace(target, '');
  }

  // cleans up excess
  parts.excess = parts.excess.replace(/^[-\. ]+/, '');
  parts.excess = parts.excess.replace(/[-\. ]+$/, '');
  parts.excess = parts.excess.replace(/[\(\)\/]/g, '');
  parts.excess = parts.excess.replace(/EXTENDED|HC|PROPER/g, '');
  parts.excess = parts.excess.split(/\.\.+| +/).filter(Boolean);

  if(parts.excess.length === 0) delete parts.excess;
  else if(parts.excess.length === 1) parts.excess = parts.excess[0];

  // cleans up title
  if(parts.title.indexOf(' ') === -1 && parts.title.indexOf('.') !== -1)
    parts.title = parts.title.replace(/\./g, ' ');

  parts.title = parts.title.replace(/\($/, '').trim();

  return parts;
};
