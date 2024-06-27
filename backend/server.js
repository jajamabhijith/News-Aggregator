const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/user');
const UserNotes = require('./models/notes');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

mongoose.connect("mongodb+srv://jajamabhijith2004:nezHtdISZHEvd0Xn@news.kkkr7ws.mongodb.net/");
//middleware
app.use(cors());
app.use(express.json()); //tells that our application uses json data from requests
app.use(cookieParser());



app.post('/api/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userExist = await User.findOne({username});
    if(userExist){
      res.status(400).json({msg:'user already exists'});
    }else{
      if(password.length<8){
        res.json({msg:"Password is too short"})
      }else{
        const userDoc = await User.create({
          username,
          password:bcrypt.hashSync(password,salt),
          msg:"successfully registered"
        });
        const result =  await userDoc.save();
        res.json(result);
      }
      
    } 
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/api/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {expiresIn:"3d"}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        msg:"logged in successfully",
        id:userDoc._id,
        username,
        token
      });
    });
  } else {
    res.json({msg:'wrong credentials'});
  }
});

app.get('/api/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

// Define routes
app.get('/api/news/:category', async (req, res) => {
  const { category } = req.params;
  const apiKey = 'e854a7911afe4147ad92ab777501ba41'; // Replace with your News API key
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response);
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


// Endpoint to create and save a new note
app.post('/api/notes/:userId', async (req, res) => {
  const {userId} = req.params;
  const {  title, content} = req.body;
  
  try {
    let userNotes = await UserNotes.findOne({ userId });
    // If no document exists for the user, create a new one
    if (!userNotes) {
      userNotes = new UserNotes({ userId, notes: [] });
    }

    // Add the new note to the user's notes array
    userNotes.notes.push({ title, content, time: new Date() });

    // Save the document
    await userNotes.save();

    res.status(201).json(userNotes);
    
    
    
    
    // res.status(201).json({ message: 'Note added successfully', notes: userNotes.notes });
  } catch (err) {
    res.status(500).json({ message: 'Error adding note', error: err });
  }
});

// Endpoint to retrieve notes for a user
app.get('/api/notes/fetch/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userNotes = await UserNotes.findOne({ userId });
    
    if (!userNotes) {
      return res.status(404).json({ message: 'No notes found for this user' });
    }
    
    res.status(200).json({ notes: userNotes.notes });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving notes', error: err });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});









