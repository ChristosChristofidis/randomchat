/**
 * Created by Chris on 07/11/15.
 */

var express = require('express');
var app = express();

var http = require('http');

var server = http.createServer(app);




var io = require('socket.io')(server);



app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');

});


var arrayofpeople = []
io.on('connection',function(client){
    client.emit('notconnected',{hello:'s',array:arrayofpeople});
    arrayofpeople.push(client.request.headers.cookie.substring(67, 120)); //hotfix 120
    console.log(arrayofpeople);
    console.log(arrayofpeople.length);

});



server.listen(8081);