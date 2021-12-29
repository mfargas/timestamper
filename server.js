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

app.get("/api/:input?", (req, res) => {
  // const regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  const regexp2 = /^(\d{0,13})?$/;
  let dateString = req.params.input;
  let date;

  if (dateString.includes('-')) {
    date = new Date(parseInt(dateString));
    //Date regards numbers as unix timestamps, strings are processed differently
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else if(regexp2.test(dateString)) {
    date = new Date(dateString * 1000);
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else if(dateString === undefined){
    date = new Date();
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
  } else {
    let dateObject = new Date(dateString);
  if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } 
  }
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Your project can handle dates that can be successfully parsed by new Date(date_string)