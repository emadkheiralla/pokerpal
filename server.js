// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');
var models = require('./models');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(process.cwd() + '/public'));

// Routes
// =============================================================
models.sequelize.sync();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  // res.send('Welcome to the Star Wars Page!')
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/home", function(req, res){
  res.render("home")
});

//Defining middleware to serve static files
app.use('/static', express.static('public'));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
