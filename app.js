/**
 * Created by Chris on 07/11/15.
 */

var express = require('express');
var app = express();
const RoomManager = require('./room_manager.js');

var http = require('http');

var server = http.createServer(app);

const roomManager = new RoomManager();
app.get('/roomid', (req, res) => {
  roomManager.findRoom((err, roomId) => {
    if (err) {
      res.end('took too long, couldn\'t find room');
    } else {
      res.end('room id: ' + roomId);
    }
  });
});


var io = require('socket.io')(server);



app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');

});


var arrayofpeople = []
io.on('connection',function(client){
    //client.emit('notconnected',{hello:'s',array:arrayofpeople});
    //arrayofpeople.push(client.request.headers.cookie.substring(67, 120)); //hotfix 120
    //console.log(arrayofpeople);
    //console.log(arrayofpeople.length);

});



server.listen(8081);