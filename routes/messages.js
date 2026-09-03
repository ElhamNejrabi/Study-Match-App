const express= require('express');
const db = require('../db/db.js');
const router= express.Router();
const requireAuth = require('../middleware/requireAuth.js')

router.post('/', requireAuth, (req,res)=>{
  const{match_id, content}= req.body;
  const checkMatch= db.prepare('SELECT * FROM matches WHERE id = ? AND (user_a_id = ? OR user_b_id = ?)').get(match_id, req.session.userid, req.session.userid)

  if(!checkMatch){
    res.status(403).json({error:'not part of this match'})
    return
  }
  else{
    const messaging= db.prepare('INSERT INTO messages (match_id, sender_id, content) VALUES (?, ?, ?)').run(match_id,req.session.userid,content)
    res.json({id: messaging.lastInsertRowid, match_id,sender_id:req.session.userid,content});
  }
})

router.get('/:match_id', requireAuth, (req,res)=>{
  const match_id= req.params.match_id;
  const checkMatch= db.prepare('SELECT * FROM matches WHERE id = ? AND (user_a_id = ? OR user_b_id = ?)').get(match_id, req.session.userid, req.session.userid)

  if(!checkMatch){
    res.status(403).json({error:'not part of this match'})
    return
  }
  else{
    const mesg= db.prepare('SELECT * FROM messages WHERE match_id=? ORDER BY time_stamp ASC').all(match_id)
    res.json(mesg)
  }
})
module.exports= router;