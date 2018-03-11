import Mongoose from 'mogoose'

var UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});

var User = Mongoose.model('User', UserSchema);



var BookSchema = new Mongoose.schema({
    author: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    title: {
        type: String,
        unique: false,
        required: true,
        trim: true
    }
});


var Book = Mongoose.model('Book', BookSchema);


module.exports = {
    user: User,
    books: Book
};

