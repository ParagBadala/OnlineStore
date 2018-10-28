//importing libraries
//var http = require('http');
var express = require('express');
var data = require('./Project_Assignment/Schema/productCollection.json')
var parser = require('body-parser');
var fs = require('fs');
//var cors = require('cors');
var exp = express();
//exp.use(cors())
//Declaring Vaiables
var appendData = data;
var _url = '/get';
var _url1 = '/add';
var _url2 = '/edit';
var _url3 = '/delete/:id';

exp.use(parser.json());
exp.use(parser.urlencoded({ extended: false }));
exp.post('/add',function(req,res){
    console.log("Add Url invoked")
    var Obj = req.body;
    console.log(Obj);
    appendData.push(Obj);
    console.log(appendData);
    //res.send(appendData);
    fs.writeFileSync('Project_Assignment/Schema/productCollection.json',JSON.stringify(appendData));
    });

exp.listen(8080,()=>console.log("Server Running on 127.0.0.1:8080/"));
