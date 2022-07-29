
const path = require ('path');
const fs = require ('fs');
const express = require ('express');
const app = express();

// api/hierarchy/:path(*)
//

function getRouterHierarchyAPI (express, app, originPath) {
   let router = express.Router();

   router.route (':path(*)')
      .get ((req, res) => {
         let directoryPath = path.join (originPath, req.params.path);
         let unsortedList = fs.readdirSync(directoryPath, { withFileTypes: true } );
         let arrList = [];
         let directoryList = [];
         let fileList = [];

         unsortedList.forEach ((el) => {
            let name = el.name;
            let isDirectory = el.isDirectory();
            arrList.push ({ 'name': name, 'isDirectory': isDirectory });

            if (el.isDirectory())
               directoryList.push (el.name);
            else
               fileList.push (el.name);
         });

         let list = { 'directories': directoryList, 'files': fileList };
         res.status(200).send(list);
   });

   return router;
}


module.exports = getRouterHierarchyAPI;

export {};
