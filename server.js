const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors= require('cors');
const knex = require('knex');

// controlers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString :  process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
    SSL: true,
    rejectUnauthorized: false
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

//ROOT
app.get('/', (req, res) => { res.send("Success") })

//Sigin route
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt)})

//Register route
app.post('/register',(req,res) => { register.handleRegister(req, res, db, bcrypt)})

//User ID
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db)})

//counter of images
app.put('/image', (req, res) => { image.handleImage(req,res,db)})

//imageurl
app.post('/imageUrl', (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
  console.log('app is ok on port ${process.env.PORT}');
})
