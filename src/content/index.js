console.log('Netflixer loaded');

var videoSearcher = setInterval(function() {
  var vid = document.querySelector('#netflix-player video');
  if (vid != null) {
    clearInterval(videoSearcher);

    vid.addEventListener('play', function() {
      chrome.runtime.sendMessage('play');
      console.log('playing netflix stuff');
    });

    vid.addEventListener('pause', function() {
      chrome.runtime.sendMessage('stop');
      console.log('stopped netflix stuff');
    });
  }
}, 100);

