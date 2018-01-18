const express = require('express');
const Vue = require('vue');
const app = express();
var path = require('path');

console.log('starting');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'vue');

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('server started');
});

var apirouter = express.Router();
const api = require('./public/js/user-service');

apirouter.route('/users').get(api.getUsers);

apirouter.route('/users/:SSN').get(api.getUserBySSN);

app.use('/api', apirouter);
