var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/test_12_28_15');

var Student = mongoose.model('Student', {firstName:String, lastName:String, cohort:String});

router.post('/add', function(request, response, next){
    var kid = new Student({firstName: request.body.firstName, lastName: request.body.lastName, cohort: request.body.cohort});
    kid.save(function(err){
        if(err) console.log('duh', err);
        response.send(kid.toJSON());
        next();
    });
});

router.delete('/delete', function(request, response, next){
    console.log(request.params.id);
    Student.findByIdAndRemove(request.body._id, request.body, function(err, data){
        if (err) return next(err);
        response.json(data)
    });
    console.log("suppppppppp");
});

router.get('/students', function(request, response, next){
    return Student.find({}).exec(function(err,students){
        if(err) throw new Error(err);
        response.send(JSON.stringify(students));
    });
});

router.get("/*", function(req, res, next){
    console.log("Here is a console log");
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, '../public', file));
//    next();
});

module.exports = router;
