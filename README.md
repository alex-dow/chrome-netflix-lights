# chrome-netflix-lights

Using the Limitless LED Proxy app, can control your lights based on what you do on Netflix

## Installation

This software is still in development and not currently available in the chrome app store nor in any compiled state.

In order for this to work, you must first install the Limitless LED Proxy chrome application at https://github.com/alex-dow/chrome-limitlessled-proxy

Afterwords, you must build the chrome extension yourself. This requires nodejs and npm to be installed already.

```
$ git clone https://github.com/alex-dow/chrome-netflix-lights.git
$ cd chrome-netflix-lights
$ npm install -g grunt-cli
$ npm install
$ grunt
```

Once built, you can visit chrome://extenions in chrome, enable Developer Mode, then click on Load Unpacked Extension and navigate to chrome-netflix-lights/extension



