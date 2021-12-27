// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let responseObject = {};

app.get('/api/:input', (req, res)=>{
  let input = req.params.input;

  if(input.includes('-')){
    responseObject['unix'] = new Date(input).getTime();
    responseObject['UTC'] = new Date(input).toUTCString();
  } else {
    input = parseInt(input);
    
    responseObject['unix'] = new Date(input).getTime();
    responseObject['UTC'] = new Date(input).toUTCString();
  };

  if (!responseObject['unix'] || !responseObject['UTC']){
    res.json({error: 'Invalid Date'});
  }

  res.json(responseObject);
});

app.get('/api', (req, res)=>{
  responseObject['unix'] = new Date().getTime();
  responseObject['UTC'] = new Date().toUTCString();

  res.json(responseObject);
})

// A request to / api /: date ? with a valid date should return a JSON object with a utc key that 
// is a string of the input date in the format: Thu, 01 Jan 1970 00: 00: 00 GMT

// Your project can handle dates that can be successfully parsed by new Date(date_string)