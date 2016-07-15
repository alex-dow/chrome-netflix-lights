var app;

console.log('Finding Limitless LED Proxy app');

chrome.management.getAll(function(apps) {
  for (var i = 0; i < apps.length; i++) {
    if (apps[i].shortName == 'Limitless LED Proxy') {
      app = apps[i];
      break;
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Received message from content script:');
  console.log(request);
  console.log(sender);

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

