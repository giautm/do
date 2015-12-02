"use strict";
/* global module */
let mongoose = require('mongoose');

module.exports = mongoose.model('Province', mongoose.Schema({
    _id: Number,
    region: String,
    provinceName: String,
    provinceCode: [Number]
}));
