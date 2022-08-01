'use strict'

let fs = require ('fs');
let path = require ('path');
let fileUpload = require ('express-fileupload');

function getRouterFileAPI (express, app, originPath) {
   let router = express.Router();
   app.use (fileUpload());

   router.route ('/:filePath(*)')
      .get ((req, res) => {
         let filePath : string = req.params.filePath;
         console.log ('early filePath = ', filePath);
         filePath = path.join (originPath, filePath);

         console.log ('filePath = ', filePath);
         res.download (filePath, (err) => {
            if (err) {
               console.log (err);
            }

            console.log ('download completed !');
            res.status(200);
         });
      })
      .post ((req, res) => {
         if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files have been uploaded.');
            return ;
         }

         let files : any = req.files;
         let uploadPath = "";
         let filePath = req.params.filePath;
         filePath = path.join (originPath, filePath);

         if (Array.isArray (files.data)) {
            files.data.forEach ((el) => {
               uploadPath = path.join (filePath, el.name);
               moveUploadedFileToDisk (el, uploadPath);
            });
         } else {
            uploadPath = path.join (filePath, files.data.name);
            moveUploadedFileToDisk (files.data, uploadPath);
         }

         console.log ('req.body', req.body);
         console.log ('files info : ', files);
         res.status(200).send({});
      });

   return router;
}

function moveUploadedFileToDisk (file, dstLocation) {
   let error : string = "";

   file.mv (dstLocation, (err) => {
      if (err) {
         console.log ('error message : ', err);
         error = err;
      }
   });

   return error;
}


module.exports = getRouterFileAPI;

export {};
