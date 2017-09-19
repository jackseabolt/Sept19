const mongoose = require('mongoose'); 

const PostsSchema = new Schema({
    title: {type: String, required: true}, 
    content: {type: String, required: true}, 
    author: {
        firstName: {type: String, required: true}, 
        lastName: {type: String, required: true}
    }
}); 

const Post = mongoose.model("Post", PostSchema)

module.exports = {Post}; 