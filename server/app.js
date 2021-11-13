var express = require("express");
var fs = require('fs');

var app = express();

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

app.get('/measurements', (req, res) => {
    let rawdata = fs.readFileSync('data/measurements.json');
    let measurements = JSON.parse(rawdata);
    //console.log(measurements);

    return res.send(measurements);
});
