const express= require('express');
const db = require('../db/db.js');
const router= express.Router();
const requireAuth = require('../middleware/requireAuth.js')

router.get('/feed', requireAuth, (req,res)=>{
const feed= db.prepare('SELECT * FROM profiles where user_id !=? AND user_id NOT IN (SELECT target_id FROM swipes WHERE swiper_id=?)').all(req.session.userid, req.session.userid)
res.json(feed);
})

router.post('/swipe', requireAuth, (req,res)=>{
  const {target_id, decision}=req.body;
  const info = db.prepare('INSERT INTO swipes (swiper_id, target_id, decision) VALUES (?, ?, ?)').run(req.session.userid, target_id, decision);
  let matched = false;
  if(decision==='like'){
   const opposite = db.prepare('SELECT * FROM swipes WHERE swiper_id = ? AND target_id = ? AND decision = ?').get(target_id, req.session.userid,'like');
   if(opposite){
    db.prepare('INSERT INTO matches (user_a_id , user_b_id) VALUES (? ,?)').run(req.session.userid, target_id);
    matched = true;
   }
  }
  res.json({ id: info.lastInsertRowid, target_id, decision, match: matched });
})

router.get('/matches',requireAuth, (req,res)=>{
  const matches= db.prepare('SELECT * FROM matches WHERE user_a_id = ? OR user_b_id = ?').all(req.session.userid,req.session.userid)
  res.json(matches)
})

module.exports=router;