const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const router = require('./router');
const {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  port
} = require('./configs');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance'))
  .on('error', err => console.log(err));

const server = http.createServer(app);

server.listen(port);
console.log(`Listening on port ${port}`);
