const express = require('express');
var fs = require("fs");
const app = express();
var https = require('https');
const http = require('http');
var port = process.env.PORT || 3333;
var options = {
    key: fs.readFileSync('./shoppingnow.xyz/cert.pem'),
    cert: fs.readFileSync('./shoppingnow.xyz/privkey.pem')
};
httpsServer = https.createServer(options, app);
httpServer = http.Server( app);
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

httpsServer.listen(port, function() {
    console.log('Audio call running port', port); 
})

// httpServer.listen(port, function(){
//     console.log('Audio call running port', port);
// })

