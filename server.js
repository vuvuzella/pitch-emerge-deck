var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname,'/deck')));

app.listen(app.get('port'), function() {
  console.log('Node app is running in port', app.get('port'));
});
