const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors= require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : 'postgres://backend_of_the_face_recognition_app_user:0piGRzDJ9YuWTHC6XyFwlscZkL87AJka@dpg-ch76j1g2qv26p1b9rtbg-a/backend_of_the_face_recognition_app',
    host: 'dpg-ch76j1g2qv26p1b9rtbg-a.ohio-postgres.render.com',
    port: 5432,
    user: 'backend_of_the_face_recognition_app_user',
    password: '0piGRzDJ9YuWTHC6XyFwlscZkL87AJka',
    database: 'backend_of_the_face_recognition_app'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


//Sigin route
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt)})

//Register route
app.post('/register',(req,res) => { register.handleRegister(req, res, db, bcrypt)})

//User ID
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db)})

//counter of images
app.put('/image', (req, res) => { image.handleImage(req,res,db)})
app.post('/imageUrl', (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
  console.log('app is ok on port ${process.env.PORT}');
})