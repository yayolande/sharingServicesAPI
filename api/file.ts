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
            res.status(400).send('No file have been uploaded.');
            return ;
         }

         let file : any = req.files;
         let filePath = req.params.filePath;
         filePath = path.join (originPath, filePath);
         console.log ('req.body', req.body);
         console.log ('file info : ', file);
         let uploadPath = path.join (filePath, file.data.name);
         file.data.mv (uploadPath, (err) => {console.log (err);});
         res.status(200).send({});
      });

   return router;
}


module.exports = getRouterFileAPI;

export {};
