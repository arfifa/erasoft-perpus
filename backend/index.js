require('dotenv').config();
const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');

const book = require('./src/routes/BookRoute'),
  member = require('./src/routes/MemberRoute.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public/ImagesBook', express.static('public/ImagesBook'))

app.use(cors())

app.use('/book', book)
app.use('/member', member)

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`server run on port ${port}`)
})