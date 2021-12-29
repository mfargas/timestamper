// init project
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let responseObject = {};

app.get('/api/', (req, res) => {
  let now = new Date();
  res.json({
    unix: now.valueOf(),
    utc: now.toUTCString()
  });
});

app.get('/api/:input', (req, res) => {
  let dateString = req.params.input;
  const unixDate = new Date(dateString);
  const utcDate = new Date(dateString);

  if(Number.isNaN(Date.parse(unixDate))){
    const newDate = new Date(parseInt(dateString));
    if(newDate.toUTCString() === 'Invalid Date'){
      res.json({ 
        error: "Invalid Date" 
      });
    }else {
      res.json({
        unix: parseInt(dateString),
        utc: newDate.toUTCString()
      })
    }
  } else {
      res.json({
        unix: unixDate.valueOf(),
        utc: utcDate.toUTCString()
      })
  }

});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
