var express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

// to collect old data for use
var historical = require('./historical.js');
app.use('/historical', historical);

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;