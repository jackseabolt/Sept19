'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Post} = require('../models');

const {DATABASE_URL} = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection(DATABASE_URL);

router.get('/', (req,res) => {
  console.log('yoyoyoyo');
  Post
    .find()
    .then(posts => {
      res.json({
        posts: posts.map(
          (post) => post.apiRepr()
        )
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/:id', (req,res) => {
  console.log('wazzaaaaa');
  Post
    .findById(req.params.id)
    .then(post => {
      res.json(post.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `YOU'RE MISSING '${field}'!!!!`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Post
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author})
    .then(
      post => res.status(201).json(post.apiRepr())
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/:id', jsonParser, (req, res) => {
  if (!(req.params.id === req.body.id)) {
    const message = `Path ID (${req.params.id}) and body ID (${req.body.id}) have to match! Duh!`;
    console.error(message);
    return res.status(400).json({message: message});
  }

  const postUpdate = {};
  const updateableFields = ['title', 'content', 'author'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      postUpdate[field] = req.body[field];
    }
  });

  Post
    .findByIdAndUpdate(req.params.id, {$set: postUpdate})
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
  Post
    .findByIdAndRemove(req.params.id)
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;