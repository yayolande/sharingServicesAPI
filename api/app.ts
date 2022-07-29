'use strict'

const fs = require ('fs');
const path = require ('path');
const express = require ('express');
let getRouterFileAPI = require ('./file');
let getRouterHierarchyAPI = require ('./hierarchy.js');

const storageRootPath : string = path.resolve (__dirname, '../public/storage');
const app = express();
let fileRouter = getRouterFileAPI (express, app, storageRootPath);
let hierarchyRouter = getRouterHierarchyAPI (express, app, storageRootPath);

// app.use (express.text({ type: 'multipart/form-data' }));
init();

app.get('/', (req, res) => {
   let filePath : string = path.resolve (__dirname, '../public/index.htm');
   res.sendFile (filePath);
   // res.status(200).send('Welcome to File Exchange Services');
});

app.use('/api/file', fileRouter);
app.use('/api/hierarchy', hierarchyRouter);

const port = process.env.PORT || 3200;
app.listen(port, _ => console.log ('listening to port ', port));

function init() {
   fs.mkdir (storageRootPath, (err) => { console.log ('Error, Directory already exist'); });


}
