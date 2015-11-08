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


var arrayofpeople = [];
var sessionarray = [];
io.on('connection',function(client){
    client.on('lookingforstranger',function(data){
        var mycookie = client.request.headers.cookie.substring(67, 100);
        arrayofpeople.push(mycookie); //hotfix 120

        var setofpeople = new Set(arrayofpeople);
        setofpeople.forEach(function(a,person){
            console.log('person : ' + typeof(person) + ' ' + person);
            console.log('person 2nd : ' + a);
            console.log('mycookie : ' + typeof(mycookie) + ' ' + mycookie);
            if (person != mycookie){
                var sessionID = Math.random();
                sessionarray.push([mycookie,person,sessionID]);
                console.log('I was there and also : ' + typeof(sessionID) + ' ' + sessionID );
                client.emit('sessionID', {sessionID: sessionID});
                return false;

            }
        });
        try {
            client.emit('sessionID', {sessionID: sessionID});
            console.log('i tried and succeeded');
        }
        catch(e){console.log('i catched it');}
        console.log(setofpeople);
        console.log(arrayofpeople.length);




    });

    client.on('messages',function(data){


        client.broadcast.emit('message',{message:data.message,sessionID:data.sessionID});
    });

});



server.listen(8081);