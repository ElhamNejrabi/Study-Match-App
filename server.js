const express = require('express');
const sessions= require('express-session');
const authRoutes= require('./routes/auth.js');
const profileRoutes= require('./routes/profiles.js')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(sessions({secret:'some-secret-string', resave: false, saveUninitialized: false
}))
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.get('/',(req,res) =>{
  res.send('Study Match API running')
} );

app.listen(PORT, ()=>{
  console.log('the server is listening')
});