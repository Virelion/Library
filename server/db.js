const Mongoose = require('mongoose');
const config = require('./config');

Mongoose.connect(config.database);

var UserSchema = new Mongoose.Schema({
    _id: { type: String, required: true },
    hash: { type: String, required: true },
    admin: { type: Boolean, required: true},
    team: { type: Mongoose.Schema.ObjectId, ref:'teams',default : null }
});

UserSchema.virtual('name').get(function() {
    return this._id;
});

UserSchema.virtual('name').set(function(name) {
    this._id = name;
});

var TeamSchema = new Mongoose.Schema({
    _id: Mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    members: [
        {type : Mongoose.Schema.ObjectId, ref: 'users'}
    ],
    retrospectives: [
        {type : Mongoose.Schema.ObjectId, ref: 'retrospectives'}
    ]
});

var RetrospectiveSchema = new Mongoose.Schema({
    _id: Mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    date: { type: Date, required: true },
    team: {type : Mongoose.Schema.ObjectId, ref: 'teams'},
    issues: [
        {type : Mongoose.Schema.ObjectId, ref: 'issues'}
    ]
});

var IssueSchema = new Mongoose.Schema({
    _id: Mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: ['SAD','HAPPY','ANGRY','PROUD','CONFUSED'],
    retrospective: {type : Mongoose.Schema.ObjectId, ref: 'retrospectives'}
});

var newID = ()=>{
    return Mongoose.Types.ObjectId();
};

var User = Mongoose.model('users', UserSchema);
var Team = Mongoose.model('teams', TeamSchema);
var Retrospective = Mongoose.model('retrospectives', RetrospectiveSchema);
var Issue = Mongoose.model('issues', IssueSchema);

module.exports ={
    User: User,
    Team: Team,
    Retrospective: Retrospective,
    Issue: Issue,
    newID: newID
};