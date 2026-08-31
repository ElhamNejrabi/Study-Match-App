function middleWare(req,res,next){
  if(!req.session.userid){
    res.status(401).json({error: 'not logged in'});
}
else{
  next();
}

}

module.exports= middleWare;