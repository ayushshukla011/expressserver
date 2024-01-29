// index.js
const express = require('express');
const serverless = require("serverless-http");
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  "ACdf657a64445f670c3d884ed4aa0ea564",
  '325d4643a2804212f68682a00eb5dbb0'
);

const app = express();
const router = express.Router();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(pino); 

router.get('/', (req, res) => {
  res.send('App is running..');
});

router.get('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from:'+16592214980' ,
      to: '+916268326237',
      body: 'She accepted your request'
    })
    .then(() => {
      res.send(JSON.stringify({ success: "You accepted the invitation" }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: "internal error" }));
    });
});

app.use(`/.netlify/functions/index`, router);

module.exports = app;
module.exports.handler = serverless(app);
