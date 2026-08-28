const bcrypt= require('bcryptjs');
const express= require('express');
const router= express.Router();
const db = require('../db/db.js');

router.post('/signup', (req,res) => {
const{email, password, name} = req.body;
const hashPassword= bcrypt.hashSync(password,10);
const info = db.prepare('INSERT INTO users (email, user_name, password_hash) VALUES(?, ?, ?)').run(email,name,hashPassword)
req.session.userid = info.lastInsertRowid;
res.json({id: info.lastInsertRowid, email: email, name: name})
})


router.post('/login', (req,res)=>{
const{email, password, name} = req.body;
const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
if(user == undefined ){
  res.status(401).json({error:'invalid email'})
}
else{
const compare =bcrypt.compareSync(password,user.password_hash);
if(!compare){
  res.status(401).json({error:'invalid email'});
}
else{
  req.session.userid= user.id;
  res.json({id: user.id, email:user.email, name:user.user_name});
}
}
})


module.exports= router