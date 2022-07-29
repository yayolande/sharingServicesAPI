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
            res.status(400).send('No file have been uploaded.');
            return;
        }
        var file = req.files;
        var filePath = req.params.filePath;
        filePath = path.join(originPath, filePath);
        console.log('req.body', req.body);
        console.log('file info : ', file);
        var uploadPath = path.join(filePath, file.data.name);
        file.data.mv(uploadPath, function (err) { console.log(err); });
        res.status(200).send({});
    });
    return router;
}
module.exports = getRouterFileAPI;
