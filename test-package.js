"use strict";
/* global module */

let mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/do');

let Province = require('./lib/model/province.js');
let District = require('./lib/model/district.js');

let Engine = require('./lib/engine.js');

let transportVnPostCPN = require('./packages/vnpost-bpbd.js');

let dummyOrder = {
    src: 520,
    dst: 678,
    weight: 0.25,
    cashOnDelivery: 200000
};

let transportPackage = new Engine(Province, District, transportVnPostCPN);

transportPackage.processOrder(dummyOrder).then(console.log, console.log);
