// index.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  "ACdf657a64445f670c3d884ed4aa0ea564",
  'c0c278160948485ae0862dba36af86ea'
);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(pino); 

app.get('/api/messages', (req, res) => {
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
