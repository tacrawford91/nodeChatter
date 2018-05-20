var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});