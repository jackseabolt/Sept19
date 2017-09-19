'use strict';

const mongoose = require('mongoose'); 

const PostsSchema = mongoose.Schema({
  title: {type: String, required: true}, 
  content: {type: String, required: true}, 
  author: {
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}
  }
}); 

PostsSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

PostsSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorName
  };
};

const Post = mongoose.model("Post", PostsSchema);


module.exports = {Post}; 