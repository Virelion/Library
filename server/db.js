import Mongoose from 'mogoose'

var Book = new Schema({
    id: Mongoose.Schema.ObjectId,
    title: { type: String, required: true },
    available: { type: Boolean, required: true },
    authors: [ {type : Mongoose.Schema.ObjectId, ref : 'Author'} ]
});

var Author = new Schema({
    id: Mongoose.Schema.ObjectId,
    name: { type: String, default: '' },
    surname: { type: String, default: '' },
    books: [ {type : Mongoose.Schema.ObjectId, ref : 'Book'} ]
});

export var module ={
    Book: Book,
    Author: Author
};