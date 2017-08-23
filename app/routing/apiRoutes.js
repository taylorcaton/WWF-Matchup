var express = require('express');
var jsonfile = require('jsonfile')

var file = __dirname + '/../data/wrestlers.json'
var backupFile = __dirname + '/../data/wrestlers_backup.json'

module.exports = (function() {
    // 'use strict';
    var api = express.Router();

    api.post("/new", function(req, res) {
        
        console.log("Inside the post function")
        var myScores = req.body.scores; //Store the user's scores temp
        var lowestDifference = 1000;
        var matchedWrestlerIndex = -1;

        jsonfile.readFile(file, function(err, obj) {  //Read from json
            if(err) console.log(err); 
            
            obj.people.forEach(function(element, wrestlerIndex) { //Loop over each wrestler
                
                var difference = 0;
                var wScores = element.scores;

                wScores.forEach(function(score, index){ //Get the difference between each wrestler and the user
                    difference += Math.abs(score - myScores[index]);
                })

                if(difference < lowestDifference){ //Calculate the lowest difference
                    lowestDifference = difference;
                    matchedWrestlerIndex = wrestlerIndex; //grab the wrestler with the lowest difference
                }

            });

            obj.people.push(req.body); //Add user to wrestler index

            jsonfile.writeFile(file, obj, {spaces: 2}, function(err) { //Write the updated obj back to the json file
                if(err) console.error(err)
                else console.log(`${file} has been updated`);
            });

            res.send(obj.people[matchedWrestlerIndex]); //Send a response with the best matched wrestler

        })
    
    });

    api.post("/replace", function(req, res) {
        
        console.log("Inside the post function")

        jsonfile.readFile(backupFile, function(err, obj) {  //Read from json
            if(err) console.log(err); 

            jsonfile.writeFile(file, obj, {spaces: 2}, function(err) { //Write the updated obj back to the json file
                if(err) console.error(err)
                else console.log(`${file} has been replaced with the backup`);
            });

            res.send(`${file} has been replaced with the backup`); //Send a response with the best matched wrestler

        })
    
    });

    return api;
})();