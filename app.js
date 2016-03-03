var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/mongo_lecture');
mongoose.model(
    'BlogPost',
    new Schema({
        "title": String,
        "date": Date,
        "blog": String,
        "name": String,
        "comments": String
    },
    {
        collection: 'blogPostCollection'
    }
));

var BlogPost = mongoose.model('BlogPost');

app.get('/addBlogPost', function(req, res) {
    console.log('here');
    BlogPost.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

app.get('/addBlogPost/:id', function(req, res) {
    console.log('req.params.id', req.params.id);
    BlogPost.find({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

app.post('/addBlogPost', function(req, res) {
    var addedBlogPost = new BlogPost({
        "title": req.body.title,
        "date": req.body.date,
        "blog": req.body.blog,
        "name": req.body.name
    });

    addedBlogPost.save(function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        BlogPost.find({}, function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        });
    });


});

app.delete('/blogPost/:id', function(req, res) {
    console.log('req.params.id', req.params.id);
    BlogPost.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

app.put('/blogPost/:id', function(req, res){
    console.log('hellyeah');
    console.log('here is the req.body:', req.body);
    var newComments = req.body.review;
    BlogPost.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {comments: newComments}
        },
        function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        }
    );

});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});




//app.put('/blogPost/:id', function(req, res){
//    console.log('comments:', req.body.data);
//    var newComments = req.body.data;
//    BlogPost.findByIdAndUpdate(req.params.id
//        ,
//        {
//            $set: {comments: "newComments"}
//        },