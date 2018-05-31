const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require("body-parser");

//modules
const account = require("./account");
const user = require("./user");
const team = require("./team");
const retrospective = require("./retrospective");
const issue = require("./issue");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('superSecret',config.secret);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.app);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

account.init(app);
user.init(app);
team.init(app);
retrospective.init(app);
issue.init(app);

app.listen(9000);