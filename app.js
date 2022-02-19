const express = require('express');
const weather = require('weather-js');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, () => {
    console.log("Server is listening...");
});

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/result', (req,res) => {
     var location = req.body.city+','+req.body.Country;
     weather.find({search: location, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
 
       var location = result[0].location;
       var current = result[0].current;
       var forecast = result[0].forecast;
       res.render('result', { loc: location, cur: current, fore: forecast});
      });
});

