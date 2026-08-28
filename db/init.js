// importing in file system from node.js
const fs = require('fs');
const db= require('./db.js')
//improting in path for stability reasons 
const path= require('path');

const queryPath=path.join(__dirname,'schema.sql')
const storePath=fs.readFileSync(queryPath,'utf8')

 db.exec(storePath);