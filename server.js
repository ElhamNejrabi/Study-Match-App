const express = require('express');
const cors = require('cors');
const sessions= require('express-session');
const authRoutes= require('./routes/auth.js');
const profileRoutes= require('./routes/profiles.js')
const swipeRoutes=require('./routes/swipes.js');
const messages= require('./routes/messages.js')
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
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
app.use('/api/swipes',swipeRoutes);
app.use('/api/messages',messages)