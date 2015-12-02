"use strict";
/* global module */

let mongoose = require('mongoose');
var csv = require('fast-csv');
var fs = require('fs');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/do');

let Province = require('./lib/model/province.js');
let District = require('./lib/model/district.js');

let Engine = require('./lib/engine.js');


//let packName = 'vnpost-bpbd';
//let packName = 'vnpost-ghht';
//let packName = 'vnpost-ems';
let packName = 'vnpost-cpn';
//let packName = 'ghn-six-hours';
//let packName = 'ghn-one-days';
//let packName = 'ghn-two-days';
//let packName = 'ghn-three-days';
//let packName = 'kerry-cpn';
//let packName = 'kerry-cpn-tiet-kiem';

let writableStream = fs.createWriteStream('./csv/cod300-' + packName + '.csv');
writableStream.on('finish', function () {
    console.log('DONE!');
});

var csvStream = csv.createWriteStream({headers: true});
csvStream.pipe(writableStream);

function logResult(data) {
    if (data.error) {
        console.log(data.order.dst + ' ' + data.error);
    } else {
        let result = data.result;

        csvStream.write({
            src: result.srcDistrict.provinceName + ', ' + result.srcDistrict.districtName,
            dst: result.dstDistrict.provinceName + ', ' + result.dstDistrict.districtName,
            packageName: data.packageName,
            orderWeight: result.orderWeight,
            totalCharge: result.totalCharge
        });
    }
}

let transportPackages = [];

function dummy(dst1, dst2) {
    let promises = [];

    for (let e of transportPackages) {
        for (let dst = dst1; dst < dst2; dst++) {
            promises.push(e.processOrder({
                src: 520,
                dst: dst,
                weight: 0.25,
                cashOnDelivery: 300000
            }).then(logResult));

            for (let weight = 0.5; weight <= 20; weight += 0.5) {

                promises.push(e.processOrder({
                    src: 520,
                    dst: dst,
                    weight: weight,
                    cashOnDelivery: 300000
                }).then(logResult));
            }
        }
    }

    return Promise.all(promises);
}

transportPackages.push(new Engine(Province, District, require('./packages/' + packName + '.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/vnpost-ghht.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/vnpost-ems.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/vnpost-cpn.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/ghn-six-hours.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/ghn-one-days.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/ghn-two-days.js')));
//transportPackages.push(new Engine(Province, District, require('./packages/ghn-three-days.js')));

console.log('Start');
dummy(1, 714).then(function (x) {
    console.log('Complete');
    csvStream.end();
}, console.log);
console.log('Waiting....');