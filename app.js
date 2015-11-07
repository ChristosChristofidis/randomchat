/**
 * Created by Chris on 07/11/15.
 */

var express = require('express');

var http = require('http');



var server = http.createServer(function(req,res){

    res.write('Hello World');
    res.end();


});

server.listen(8080);