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
  const regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  const regexp2 = /^(\d{0,13})?$/;
  let input = req.params.input;
  let date;

  if(regexp.test(input)){
    date = new Date(input);
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else if (regexp2.test(input)){
    date = new Date(Number(input * 1e3));
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else {
    date = new Date(Number(input));
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  };

  if (!responseObject['unix'] || !responseObject['utc']){
    res.json({error: 'Invalid Date'});
  }

  res.json(responseObject);
});

app.get('/api', (req, res)=>{
  let date = new Date();
  responseObject['unix'] = date.getTime();
  responseObject['utc'] = date.toUTCString();

  res.json(responseObject);
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Your project can handle dates that can be successfully parsed by new Date(date_string)