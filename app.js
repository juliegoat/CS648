const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient, assert = require('assert');

app.set('view engine', 'ejs')

var url = 'mongodb://mongo:27017/blog';

var db
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
})


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	db.collection('posts').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {posts: result})
  })
})

app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/postsjson', (req, res) => {
  db.collection('posts').find().toArray(function(err, results) {
    if (err) 
    	return next(err)
    res.send(results)
  })
})


app.get('/posts/:id', (req, res) => {
  db.collection('posts').find().toArray(function(err, result) {
    if (err) 
    	return next(err)
    res.send(result)
  })
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})