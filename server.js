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

app.get('/api/:input', (req, res)=>{
  let input = req.params.input;
  let date;

  if(input.includes('-')){
    date = new Date(input);
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else if(!NaN(input)) {
    date = new Date(parseInt(input));
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else {
    responseObject['unix'] = Number(new Date(input).getTime());
    responseObject['utc'] = new Date(input).toUTCString();
  };

  if (!responseObject['unix'] || !responseObject['utc']){
    res.json({error: 'Invalid Date'});
  }

  res.json(responseObject);
});

app.get('/api', (req, res)=>{
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();

  res.json(responseObject);
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Your project can handle dates that can be successfully parsed by new Date(date_string)