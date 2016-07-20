var log = require('../common/logging.js');

var is_watching = false;
var is_playing = false;

function isPlaying(vid) {

  return (vid.currentTime > 0 && vid.paused == false && vid.ended == false);

}

function setupVideo() {

  log.msg('Setting up the video player');

  var videoSearcher = setInterval(function() {
    var vid = document.querySelector('#netflix-player video');
    if (vid != null) {
      clearInterval(videoSearcher);

      vid.addEventListener('play', function() {
        chrome.runtime.sendMessage('play');
        is_playing = true;
        log.msg('Netflix video has started playing');
      });

      vid.addEventListener('pause', function() {
        chrome.runtime.sendMessage('stop');
        is_playing = false;
        log.msg('Netflix video has stopped playing');
      });

      if (isPlaying(vid)) {
        chrome.runtime.sendMessage('play');
        is_playing = true;
        log.msg('Netflix is actually already playing!');
      }
    } else {
      log.msg('Waiting for the <video> tag to appear');
    }
  }, 100);
}

function teardownVideo() {
  log.msg('Teardown setup');
  is_playing = false;
  chrome.runtime.sendMessage('stop');
}

function onUnload(e) {
  log.msg('unload');
  log.msg(e);
}

function onPopstate(e) {
  log.msg('popstate');
  log.msg(e);
}

setInterval(function() {
  if (location.href.indexOf('/watch/') > -1 && is_watching == false) {
    is_watching = true;
    setupVideo();
  } else if (location.href.indexOf('/watch/') == -1 && is_watching == true) {
    is_watching = false;
    is_playing = false;
    teardownVideo();
  }
}, 1000);
    
log.msg('Netflixer loaded');

window.onbeforeunload = function(e) {
  if (is_watching == true) {
    log.msg('User navigated away from /watch/ url');
    teardownVideo();
  }
}
