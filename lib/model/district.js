"use strict";
/* global module */
let mongoose = require('mongoose');

module.exports = mongoose.model('District', mongoose.Schema({
    _id: Number,
    districtName: String,
    districtCode: [Number],
    provinceId: Number,
    provinceName: String,
    provinceCode: [Number]
}));