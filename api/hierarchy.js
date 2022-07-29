"use strict";
exports.__esModule = true;
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
// api/hierarchy/:path(*)
//
function getRouterHierarchyAPI(express, app, originPath) {
    var router = express.Router();
    router.route(':path(*)')
        .get(function (req, res) {
        var directoryPath = path.join(originPath, req.params.path);
        var unsortedList = fs.readdirSync(directoryPath, { withFileTypes: true });
        var arrList = [];
        var directoryList = [];
        var fileList = [];
        unsortedList.forEach(function (el) {
            var name = el.name;
            var isDirectory = el.isDirectory();
            arrList.push({ 'name': name, 'isDirectory': isDirectory });
            if (el.isDirectory())
                directoryList.push(el.name);
            else
                fileList.push(el.name);
        });
        var list = { 'directories': directoryList, 'files': fileList };
        res.status(200).send(list);
    });
    return router;
}
module.exports = getRouterHierarchyAPI;
