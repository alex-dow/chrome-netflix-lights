var app;
var log = require('../common/logging.js');

log.msg('Finding Limitless LED Proxy app');

chrome.management.getAll(function(apps) {
  for (var i = 0; i < apps.length; i++) {
    if (apps[i].shortName == 'Limitless LED Proxy') {
      app = apps[i];
      return;
    }
  }

  log.err('Unable to find the Limitless LED Proxy app. You must install this app before using Netflixer');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  log.msg('Received message from content script:');
  log.msg(request);
  log.msg(sender);

  if (request == 'play') {
    chrome.runtime.sendMessage(app.id, {
      cmd: 'off',
      group: 1
    });
  } else if (request == 'stop') {
    chrome.runtime.sendMessage(app.id, {
      cmd: 'on',
      group: 1
    });
  }
});

