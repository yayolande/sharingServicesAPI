'use strict';
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');
function getRouterFileAPI(express, app, originPath) {
    var router = express.Router();
    app.use(fileUpload());
    router.route('/:filePath(*)')
        .get(function (req, res) {
        var filePath = req.params.filePath;
        console.log('early filePath = ', filePath);
        filePath = path.join(originPath, filePath);
        console.log('filePath = ', filePath);
        res.download(filePath, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('download completed !');
            res.status(200);
        });
    })
        .post(function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files have been uploaded.');
            return;
        }
        var files = req.files;
        var uploadPath = "";
        var filePath = req.params.filePath;
        filePath = path.join(originPath, filePath);
        if (Array.isArray(files.data)) {
            files.data.forEach(function (el) {
                uploadPath = path.join(filePath, el.name);
                moveUploadedFileToDisk(el, uploadPath);
            });
        }
        else {
            uploadPath = path.join(filePath, files.data.name);
            moveUploadedFileToDisk(files.data, uploadPath);
        }
        console.log('req.body', req.body);
        console.log('files info : ', files);
        res.status(200).send({});
    });
    return router;
}
function moveUploadedFileToDisk(file, dstLocation) {
    var error = "";
    file.mv(dstLocation, function (err) {
        if (err) {
            console.log('error message : ', err);
            error = err;
        }
    });
    return error;
}
module.exports = getRouterFileAPI;
