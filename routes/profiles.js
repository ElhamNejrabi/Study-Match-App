const express= require('express');
const db = require('../db/db.js');
const router= express.Router();
const requireAuth = require('../middleware/requireAuth.js')


router.post('/profile', requireAuth, (req,res) =>{
const{subject_studying, availible_time, bio}= req.body;
try {
  const info =db.prepare('INSERT INTO profiles (subject_studying, availible_time, bio, user_id) VALUES( ?, ?, ?, ?)').run(subject_studying,availible_time,bio, req.session.userid);
res.json({id: info.lastInsertRowid, subject_studying,availible_time,bio});
} catch (error) {
  res.status(409).json({error:'profile already exists'});
}
})

router.get('/profile', requireAuth, (req,res)=>{
const user=db.prepare('SELECT * FROM profiles where user_id = ?').get(req.session.userid)
if(!user){
res.status(404).json({error:'profile does not exist yet'});
}
else{
  res.json(user)
}

})

module.exports= router;
