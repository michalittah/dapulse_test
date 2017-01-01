/**
 * Created by Michal on 1/01/17.
 */
var Message = require('./models/message');

function getLastMessages(res, last_message_id) {
    Message.find({_id: {$gt: last_message_id}}).exec(function (err, messages) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(messages); // return all messages in JSON format
    });
}

function getAllMessages(res) {
    Message.find().exec(function (err, messages) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(messages); // return all messages in JSON format
    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    // get all messages
    app.get('/api/lastMessages/:message_id', function (req, res) {
        // use mongoose to get last messages in the database
        getLastMessages(res, req.params.message_id);

    });

    app.get('/api/allMessages', function (req, res) {
        // use mongoose to get all messages in the database
        getAllMessages(res);
    });


    // create message and send back all messages after creation
    app.post('/api/messages', function (req, res) {

        // create a message, information comes from AJAX request from Angular
        Message.create({
            user_id: req.body.user_id,
            text: req.body.text
        }, function (err) {
            if (err)
                res.send(err);

            // get and return all the messages after you create another
            getLastMessages(res, req.body.last_message_id);
        });

    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
