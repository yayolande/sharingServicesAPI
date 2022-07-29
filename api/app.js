'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var getRouterFileAPI = require('./file');
var getRouterHierarchyAPI = require('./hierarchy.js');
var storageRootPath = path.resolve(__dirname, '../public/storage');
var app = express();
var fileRouter = getRouterFileAPI(express, app, storageRootPath);
var hierarchyRouter = getRouterHierarchyAPI(express, app, storageRootPath);
// app.use (express.text({ type: 'multipart/form-data' }));
init();
app.get('/', function (req, res) {
    var filePath = path.resolve(__dirname, '../public/index.htm');
    res.sendFile(filePath);
    // res.status(200).send('Welcome to File Exchange Services');
});
app.use('/api/file', fileRouter);
app.use('/api/hierarchy', hierarchyRouter);
var port = process.env.PORT || 3200;
app.listen(port, function (_) { return console.log('listening to port ', port); });
function init() {
    fs.mkdir(storageRootPath, function (err) { console.log('Error, Directory already exist'); });
}
