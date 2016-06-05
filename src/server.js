var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

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

app.listen('8080', function() {

});