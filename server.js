// server.js

//Run with: node PORT=8081 server.js
//Run with ports below 1024 with sudo: node PORT=80 server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json


// ROUTES
// ==============================================



app.post('/echoData', function(req, res){
  response = JSON.parse(req.body.response);  
  //console.log(response.activity.creationTimestamp);
  description = JSON.parse(response.activity.description);
  summary = description.summary
  console.log(summary);

  res.sendStatus(200);
});

// START THE SERVER
//getIPAddress from http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js/15075395#15075395
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}

// ==============================================
app.listen(port, getIPAddress());
console.log('echoMonitor watching ', port, "at  address", getIPAddress());
