var ptn = require('./');
var tape = require('tape');

var torrents = [
  {
    name: 'The Walking Dead S05E03 720p HDTV x264-ASAP[ettv]',
    title: 'The Walking Dead',
    season: 'S05',
    episode: 'E03',
    resolution: '720p',
    quality: 'HDTV',
    codec: 'x264',
    group: 'ASAP[ettv]'
  },
  {
    name: 'Hercules (2014) 1080p BrRip H264 - YIFY',
    title: 'Hercules',
    year: 2014,
    resolution: '1080p',
    quality: 'BrRip',
    codec: 'H264',
    group: 'YIFY'
  },
  {
    name: 'Dawn.of.the.Planet.of.the.Apes.2014.HDRip.XViD-EVO',
    title: 'Dawn of the Planet of the Apes',
    year: 2014,
    quality: 'HDRip',
    codec: 'XViD',
    group: 'EVO'
  },
  {
    name: 'The Big Bang Theory S08E06 HDTV XviD-LOL [eztv]',
    codec: 'XviD',
    group: 'LOL [eztv]'
  },
  {
    name: '22 Jump Street (2014) 720p BrRip x264 - YIFY',
    title: '22 Jump Street'
  },
  {
    name: 'Hercules.2014.EXTENDED.1080p.WEB-DL.DD5.1.H264-RARBG',
    quality: 'WEB-DL'
  },
  {
    name: 'Hercules (2014) WEBDL DVDRip XviD-MAX',
    quality: 'DVDRip'
  },
  {
    name: 'WWE Hell in a Cell 2014 PPV WEB-DL x264-WD -={SPARROW}=-',
    quality: 'WEB-DL'
  },
  {
    name: 'UFC.179.PPV.HDTV.x264-Ebi[rartv]',
    quality: 'HDTV'
  },
  {
    name: 'Marvels Agents of S H I E L D S02E05 HDTV x264-KILLERS [eztv]',
    title: 'Marvels Agents of S H I E L D'
  },
  {
    name: 'X-Men.Days.of.Future.Past.2014.1080p.WEB-DL.DD5.1.H264-RARBG',
    title: 'X-Men Days of Future Past'
  },
  {
    name: 'Guardians Of The Galaxy 2014 R6 720p HDCAM x264-JYK',
    region: 'R6',
    quality: 'HDCAM'
  },
  {
    name: 'Marvel\'s.Agents.of.S.H.I.E.L.D.S02E01.Shadows.1080p.WEB-DL.DD5.1',
    title: 'Marvel\'s Agents of S H I E L D'
  },
  {
    name: 'Marvels Agents of S.H.I.E.L.D. S02E06 HDTV x264-KILLERS[ettv]',
    title: 'Marvels Agents of S.H.I.E.L.D.'
  },
  {
    name: 'Guardians of the Galaxy (CamRip / 2014)',
    excess: undefined
  },
  {
    name: 'The.Walking.Dead.S05E03.1080p.WEB-DL.DD5.1.H.264-Cyphanix[rartv]',
    year: undefined
  },
  {
    name: 'Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE',
    region: 'R5'
  }
];

torrents.forEach(function(torrent) {
  var testName = '"' + torrent.name + '"';

  tape(testName, function (test) {
    var key, testMessage;

    for(key in torrent) {
      if(key === 'name') continue;

      testMessage = key + ' should be "' + torrent[key] + '"';

      test.equal(
        ptn(torrent.name)[key],
        torrent[key],
        testMessage
      );
    }

    test.end();
  });
});
