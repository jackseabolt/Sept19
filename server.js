"use strict"; 

const express = require("express"); 
const app = express(); 
const mongoose = require('mongoose'); 
const {Post} = require('./models'); 
mongoose.Promise = global.Promise; 