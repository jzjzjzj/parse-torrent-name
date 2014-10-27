var patterns = {
  season: /[S][0-9]{2}/,
  episode: /[E][0-9]{2}/,
  year: /\(?((?:19|20)[0-9]{2})\)?/,
  resolution: /[0-9]{3,4}p/,
  quality: /HDTV|HDCAM|BrRip|TS|WEB-DL|HDRip|DVDRip|DVDRiP|DVDRIP|CamRip|WEBRip/,
  codec: /xvid|x264|h264/i,
  group: /- ?([^-]+)$/
};

module.exports = function (name) {
  var matches,
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
    group: name.match(patterns.group)
  };

  if(matches.season) parts.season = matches.season[0];
  if(matches.episode) parts.episode = matches.episode[0];
  if(matches.year) parts.year = matches.year[1];
  if(matches.resolution) parts.resolution = matches.resolution[0];
  if(matches.quality) parts.quality = matches.quality[0];
  if(matches.codec) parts.codec = matches.codec[0];
  if(matches.group) parts.group = matches.group[1];

  // finds title
  if(matches.season && matches.season.index < lowestIndex) lowestIndex = matches.season.index;
  if(matches.episode && matches.episode.index < lowestIndex) lowestIndex = matches.episode.index;
  if(matches.year && matches.year.index < lowestIndex) lowestIndex = matches.year.index;
  if(matches.resolution && matches.resolution.index < lowestIndex) lowestIndex = matches.resolution.index;
  if(matches.quality && matches.quality.index < lowestIndex) lowestIndex = matches.quality.index;
  if(matches.codec && matches.codec.index < lowestIndex) lowestIndex = matches.codec.index;
  if(matches.group && matches.group.index < lowestIndex) lowestIndex = matches.group.index;

  parts.title = name.substr(0, lowestIndex);

  // extracts excess from name
  for(key in parts) {
    if(key != 'excess') parts.excess = parts.excess.replace(parts[key], '');
  }

  // cleans up excess
  parts.excess = parts.excess.replace(/^[-\. ]+/, '');
  parts.excess = parts.excess.replace(/[-\. ]+$/, '');
  parts.excess = parts.excess.replace(/[\(\)\/]/g, '');
  parts.excess = parts.excess.split(/\.\.+| +/);

  if(parts.excess[0] === '') delete parts.excess;

  // cleans up title
  if(parts.title.indexOf(' ') === -1 && parts.title.indexOf('.') !== -1)
    parts.title = parts.title.replace(/\./g, ' ');

  parts.title = parts.title.replace(/\($/, '').trim();

  return parts;
};
