// Express JS wird importiert
var express = require("express");
// Die Bibliothek um Dateien zu lesen wird importiert
var fs = require('fs');

// Server wird erstellt
var app = express();
// wir wollen JSON die API verwenden
app.use(express.json());

// Server wird auf Port 3000 gestartet
// der Server startet und wartet auf Requests
// die Requests werden auch in dieser Datei definiert
app.listen(3000, () => {
	console.log("Server running on port 3000");
});

// Login als POST Request
// Der Request bekommt username und password in body
app.post('/login', (req, res) => {
    // username und password werden aus dem Request Body gelesen
    var username = req.body.username;
    var password = req.body.password;
    // nur magda, kirsten und max sind erlaubt
    if ( (username === 'magda' && password == 'magda')
            || (username === 'kirsten' && password == 'kirsten')
            || (username === 'max' && password == 'max') ) {
        // login erfolgreich
        // wir senden den HTTP Code 200 OK zurück
        res.status(200).send();
    } else {
        // login nicht erfolgreich
        // wir senden den HTTP Code 401 unauthorized zurück
        res.status(401).send();
    }
});

// Liefert die Liste mit Containers eines Users
// z.B. /magda/containers liefert die Containers
// und deren Beschreibungen für den User magda
app.get('/:username/containers', (req, res) => {
    // username wird aus dem Request (Link) Parameters gelesen
    let username = req.params.username;
    // Inhalt der Datei wird gelesen, z.B. data/containers_magda.json
    let rawdata = fs.readFileSync('data/containers_' + username + '.json');
    // Der Inhalt wird als JSON geparsed
    let containers = JSON.parse(rawdata);
    // Das geparste JSON Objekt wird zurückgegeben
    return res.send(containers);
});

// Liefert die Measurements (Messungen) für einen bestimmten Container
// Z.B. /measurements/CNT100023 liefert die Messungen für den Container CNT100023
app.get('/measurements/:containerNumber', (req, res) => {
    // containerNumber wird aus dem Request (Link) Parameters gelesen
    let containerNumber = req.params.containerNumber;
    // Inhalt der Datei wird gelesen, z.B. data/measurements_CNT100023.json
    let rawdata = fs.readFileSync('data/measurements_' + containerNumber + '.json');
    // Der Inhalt wird als JSON geparsed
    let measurements = JSON.parse(rawdata);
    // Das geparste JSON Objekt wird zurückgegeben
    return res.send(measurements);
});

// Liefert die Breaking News (das ist der Scrolling Text in News Screen
// nimmt eine zufällige Breaking News Nachricht aus einer Liste
app.get('/breaking', (req, res) => {
    let message = [
        "Corona lockdown expected in many european countries",
        "New US import tax in place next week",
        "Carbon footprint of the logistic industry at an all time low",
        "Supply chain issues as Omicron concerns dampen air cargo demand"
      ];
    let size = 4;
    let index = Math.floor(Math.random() * Math.floor(size));
    return res.send(message[index]);
});

// Liefert die Breaking News (das ist der Scrolling Text in News Screen
// nimmt eine zufällige Breaking News Nachricht aus einer Liste
app.get('/message', (req, res) => {
    let message = [
        "Can you please provide more information?",
        "I am not sure whether I understood you correctly.",
        "We are already of this issue and we are working on fixing it.",
        "Thank you for your message. Our team will investigate the problem and get back to you.",
        "Does this problem affect your other containers?"
      ];
    let size = 5;
    let index = Math.floor(Math.random() * Math.floor(size));
    return res.send(message[index]);
});