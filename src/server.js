var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var port = Number(process.env.PORT);

app.get('/', function(req, res) {

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

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');

        var filepath = path.resolve(__dirname, '../public/' + filename);
        var stream = fs.createReadStream(filepath);
        stream.pipe(res);

    } catch (exception) {
        res.send({
            statusCode: 404,
            error: exception.message
        });

    }

});

app.listen(port || 8080);
