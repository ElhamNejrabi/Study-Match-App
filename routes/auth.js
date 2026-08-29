const bcrypt= require('bcryptjs');
const express= require('express');
const router= express.Router();
const db = require('../db/db.js');

// route handler for signup 
router.post('/signup', (req,res) => {
const{email, password, name} = req.body;
const hashPassword= bcrypt.hashSync(password,10);
// saltRounds are 10
const info = db.prepare('INSERT INTO users (email, user_name, password_hash) VALUES(?, ?, ?)').run(email,name,hashPassword) // ? ? ? is what is stored inside of SQL until the user inserts an email, password, and username. Then the ? ? ? is replaced by the users input
req.session.userid = info.lastInsertRowid;
res.json({id: info.lastInsertRowid, email: email, name: name})
})

//Login, takes the password that user puts in, hashes it and compares it to the hash that is stored. if not the same then gives an error.
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


//Destroys the session
router.post('/logout', (req,res)=>{
req.session.destroy(()=>{
  res.json({message: 'logged out'});
});
})


//checks if you are logged in by finding the users id. if id is undef that means the user is not logged in and returns a 401 error
router.get('/me', (req,res)=>{
  if(!req.session.userid){
    res.status(401).json({error: 'not logged in'});
    }else{
    const user= db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userid);
      if(!user){
        res.status(401).json({error:'not logged in'});
      }
      else{
        res.json({id: user.id, email:user.email, name:user.user_name})
      }
    }


})


module.exports= router