import Mongoose from 'mogoose'

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
})


