var express = require("express");
var fs = require('fs');

var app = express();
app.use(express.json());

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // nur magda und kirsten sind erlaubt
    if ( (username === 'magda' && password == 'magda')
            || (username === 'kirsten' && password == 'kirsten')
            || (username === 'max' && password == 'max') ) {
        // login erfolgreich
        res.status(200).send();
    } else {
        // login nicht erfolgreich - unauthorized
        res.status(401).send();
    }
});

app.get('/:username/containers', (req, res) => {
    let username = req.params.username;
    let rawdata = fs.readFileSync('data/containers_' + username + '.json');
    let containers = JSON.parse(rawdata);
    return res.send(containers);
});


app.get('/measurements/:containerNumber', (req, res) => {
    let containerNumber = req.params.containerNumber;
    let rawdata = fs.readFileSync('data/measurements_' + containerNumber + '.json');
    let measurements = JSON.parse(rawdata);
    return res.send(measurements);
});
