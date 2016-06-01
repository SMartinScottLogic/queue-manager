var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/queue', function (req, res) {
    res.json(
        [{ id: 10, text: 'Hello' }, { id: 11, text: 'Hi' }, { id: 12, text: 'Bob' }]
    );
})

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

app.use('/', express.static(path.join(__dirname, '../app2')));
app.all('/*', function(req, res){
  res.sendFile('app2/index.html', { root: path.join(__dirname, '../') });
});
