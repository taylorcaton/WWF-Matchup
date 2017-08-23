var express = require('express');
var path = require('path')
var jsonfile = require('jsonfile')

module.exports = (function() {
    
    var router = express.Router();

    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html') );
    });

    router.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html') );
    });

    // router.get('/partials/:name', function (req, res) {
    //     var name = req.params.name;
    //     res.render('partials/' + name);
    // });

    return router;    
})();