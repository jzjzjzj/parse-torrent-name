'use strict';

var ptn = require('./');
var tape = require('tape');

var torrents = [
  {
    name: 'The Walking Dead S05E03 720p HDTV x264-ASAP[ettv]',
    title: 'The Walking Dead',
    season: 5,
    episode: 3,
    resolution: '720p',
    quality: 'HDTV',
    codec: 'x264',
    audio: undefined,
    group: 'ASAP[ettv]',
    extended: undefined,
    hardcoded: undefined,
    excess: undefined
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
    season: 8,
    episode: 6,
    quality: 'HDTV',
    codec: 'XviD',
    group: 'LOL [eztv]'
  },
  {
    name: '22 Jump Street (2014) 720p BrRip x264 - YIFY',
    title: '22 Jump Street',
    episode: undefined
  },
  {
    name: 'Hercules.2014.EXTENDED.1080p.WEB-DL.DD5.1.H264-RARBG',
    extended: true,
    quality: 'WEB-DL',
    audio: 'DD5.1',
    excess: undefined
  },
  {
    name: 'Hercules.2014.EXTENDED.HDRip.XViD-juggs[ETRG]',
    extended: true,
    excess: undefined
  },
  {
    name: 'Hercules (2014) WEBDL DVDRip XviD-MAX',
    quality: 'WEBDL DVDRip',
    excess: undefined
  },
  {
    name: 'WWE Hell in a Cell 2014 PPV WEB-DL x264-WD -={SPARROW}=-',
    quality: 'PPV WEB-DL',
    group: 'WD -={SPARROW}=-',
    excess: undefined
  },
  {
    name: 'UFC.179.PPV.HDTV.x264-Ebi[rartv]',
    title: 'UFC 179',
    quality: 'PPV.HDTV'
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
    title: 'Marvel\'s Agents of S H I E L D',
    episodeName: 'Shadows',
    audio: 'DD5.1',
    excess: undefined
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
    codec: 'H.264',
    year: undefined,
    excess: undefined
  },
  {
    name: 'Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE',
    region: 'R5',
    audio: 'LiNE',
    excess: undefined
  },
  {
    name: 'Lets.Be.Cops.2014.BRRip.XViD-juggs[ETRG]',
    quality: 'BRRip'
  },
  {
    name: 'These.Final.Hours.2013.WBBRip XViD',
    quality: 'WBBRip'
  },
  {
    name: 'Downton Abbey 5x06 HDTV x264-FoV [eztv]',
    title: 'Downton Abbey',
    season: 5,
    episode: 6,
    excess: undefined
  },
  {
    name: 'Annabelle.2014.HC.HDRip.XViD.AC3-juggs[ETRG]',
    hardcoded: true,
    audio: 'AC3',
    excess: undefined
  },
  {
    name: 'Lucy.2014.HC.HDRip.XViD-juggs[ETRG]',
    hardcoded: true,
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E04 HDTV x264-FUM[ettv]',
    excess: undefined
  },
  {
    name: 'South Park S18E05 HDTV x264-KILLERS [eztv]',
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E03 HDTV x264-LOL[ettv]',
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E01 HDTV x264-LOL[ettv]',
    excess: undefined
  },
  {
    name: 'Lucy 2014 Dual-Audio WEBRip 1400Mb',
    audio: 'Dual-Audio',
    garbage: '1400Mb',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Teenage Mutant Ninja Turtles (HdRip / 2014)',
    title: 'Teenage Mutant Ninja Turtles',
    quality: 'HdRip'
  },
  {
    name: 'Teenage Mutant Ninja Turtles (unknown_release_type / 2014)',
    excess: 'unknown_release_type',
    proper: undefined
  },
  {
    name: 'The Simpsons S26E05 HDTV x264 PROPER-LOL [eztv]',
    proper: true,
    excess: undefined
  },
  {
    name: '2047 - Sights of Death (2014) 720p BrRip x264 - YIFY',
    title: '2047 - Sights of Death',
    year: 2014,
    excess: undefined,
    repack: undefined
  },
  {
    name: 'Two and a Half Men S12E01 HDTV x264 REPACK-LOL [eztv]',
    repack: true,
    excess: undefined
  },
  {
    name: 'Dinosaur 13 2014 WEBrip XviD AC3 MiLLENiUM',
    quality: 'WEBrip',
    audio: 'AC3',
    group: 'MiLLENiUM',
    excess: undefined
  },
  {
    name: 'Teenage.Mutant.Ninja.Turtles.2014.HDRip.XviD.MP3-RARBG',
    audio: 'MP3',
    excess: undefined
  },
  {
    name: 'Dawn.Of.The.Planet.of.The.Apes.2014.1080p.WEB-DL.DD51.H264-RARBG',
    audio: 'DD51',
    excess: undefined
  },
  {
    name: 'Teenage.Mutant.Ninja.Turtles.2014.720p.HDRip.x264.AC3.5.1-RARBG',
    audio: 'AC3.5.1',
    excess: undefined
  },
  {
    name: 'Gotham.S01E05.Viper.WEB-DL.x264.AAC',
    episodeName: 'Viper',
    audio: 'AAC',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Into.The.Storm.2014.1080p.WEB-DL.AAC2.0.H264-RARBG',
    audio: 'AAC2.0',
    excess: undefined
  },
  {
    name: 'Lucy 2014 Dual-Audio 720p WEBRip',
    audio: 'Dual-Audio',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Into The Storm 2014 1080p BRRip x264 DTS-JYK',
    audio: 'DTS',
    excess: undefined
  },
  {
    name: 'Sin.City.A.Dame.to.Kill.For.2014.1080p.BluRay.x264-SPARKS',
    quality: 'BluRay'
  },
  {
    name: 'WWE Monday Night Raw 3rd Nov 2014 HDTV x264-Sir Paul',
    title: 'WWE Monday Night Raw',
    garbage: '3rd Nov'
  },
  {
    name: 'Jack.And.The.Cuckoo-Clock.Heart.2013.BRRip XViD',
    title: 'Jack And The Cuckoo-Clock Heart',
    group: undefined,
    excess: undefined
  },
  {
    name: 'WWE Hell in a Cell 2014 HDTV x264 SNHD',
    group: 'SNHD',
    excess: undefined
  },
  {
    name: 'Dracula.Untold.2014.TS.XViD.AC3.MrSeeN-SiMPLE',
    group: 'MrSeeN-SiMPLE',
    excess: undefined
  },
  {
    name: 'The Missing 1x01 Pilot HDTV x264-FoV [eztv]',
    episodeName: 'Pilot',
    excess: undefined
  },
  {
    name: 'Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV[rartv]',
    season: 8,
    episode: 11,
    episodeName: 'Dark Water',
    excess: undefined
  },
  {
    name: 'Gotham.S01E07.Penguins.Umbrella.WEB-DL.x264.AAC',
    episodeName: 'Penguins Umbrella',
    excess: undefined
  },
  {
    name: 'One Shot [2014] DVDRip XViD-ViCKY',
    title: 'One Shot',
    excess: undefined
  },
  {
    name: 'The Shaukeens 2014 Hindi (1CD) DvDScr x264 AAC...Hon3y',
    quality: 'DvDScr',
    excess: ['Hindi', '1CD']
  },
  {
    name: 'The Shaukeens (2014) 1CD DvDScr Rip x264 [DDR]',
    quality: 'DvDScr',
    garbage: 'Rip',
    excess: ['1CD', '[DDR]']
  },
  {
    name: 'Annabelle.2014.1080p.PROPER.HC.WEBRip.x264.AAC.2.0-RARBG',
    audio: 'AAC.2.0',
    group: 'RARBG'
  }
];

torrents.forEach(function(torrent) {
  var testName = '"' + torrent.name + '"';
  var parts = ptn(torrent.name);

  tape(testName, function (test) {
    var key, testMessage;

    for(key in torrent) {
      if(torrent.hasOwnProperty(key)) {
        if(key === 'name') {
          continue;
        }

        testMessage = key + ' should be ' + JSON.stringify(torrent[key]);

        test[Array.isArray(torrent[key]) ? 'deepEqual' : 'equal'](
          parts[key],
          torrent[key],
          testMessage
        );
      }
    }

    test.end();
  });
});
