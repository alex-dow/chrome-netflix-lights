var log = require('../common/logging.js');

var is_watching = false;

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
        log.msg('Netflix video has started playing');
      });

      vid.addEventListener('pause', function() {
        chrome.runtime.sendMessage('stop');
        log.msg('Netflix video has stopped playing');
      });

      if (isPlaying(vid)) {
        chrome.runtime.sendMessage('play');
        log.msg('Netflix is actually already playing!');
      }
    } else {
      log.msg('Waiting for the <video> tag to appear');
    }
  }, 100);
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
  log.msg('is_watching = ', is_watching);
  console.log('is_watching:', is_watching);
  log.msg('is_watching: ' + is_watching);
  if (location.href.indexOf('/watch/') > -1 && is_watching == false) {
    is_watching = true;
    setupVideo();
  } else if (location.href.indexOf('/watch/') == -1 && is_watching == true) {
    is_watching = false;
  }
}, 1000);
    
log.msg('Netflixer loaded');
