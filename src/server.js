var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var port = Number(process.env.PORT);

app.get('/', function (req, res) {

    var files = fs.readdirSync(path.resolve(__dirname, '../public'));
    var availableFiles = [];
    var i = 0;

    for (i; i < files.length; i++) {

        if (files[i].endsWith(".pdf")) {
            availableFiles.push(files[i]);
        }
    }

    res.send(JSON.stringify(availableFiles));
});

app.get('/:filename', function (req, res) {
    var filename = req.params.filename;
    try {

        var filepath = path.resolve(__dirname, '../public/' + filename);

        res.download(filepath, filename, function (err) {

            if (err) {
                res.send({
                    statuCode: 404,
                    error: err.message
                });
            }
        });

    } catch (exception) {
        res.send({
            statusCode: 404,
            error: exception.message
        });

    }

});

app.listen(port || 8080);
