const hue = require('node-hue-api');

hue.nupnpSearch().then(bridge => console.log('FOUND BRIDGE', bridge)).done();