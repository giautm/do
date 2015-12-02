"use strict";
/* global module*/

let stairLookup = require('./stairLookup.js');
let assert = require('assert');

function fineZone(province, district, data) {
    let srcDistrict = district.findOne({_id: data.order.src}).exec();
    let dstDistrict = district.findOne({_id: data.order.dst}).exec();


    return Promise.all([srcDistrict, dstDistrict]).then((districts) => {
            let srcZone = [];
            let dstZone = [];
            let matchRoutes = [];
            let skipLevel0 = false;
            if (this.routeForSameProvince &&
                districts[0].provinceId == districts[1].provinceId) {

                matchRoutes.push(this.routeForSameProvince);
                skipLevel0 = true;
            }

            for (let zone of this.zones) {
                if (zone.belong(districts[0])) {
                    srcZone.push(zone);
                }
                if (zone.belong(districts[1])) {
                    dstZone.push(zone);
                }
            }

            if (!srcZone.length || !dstZone.length) {
                throw new Error('Không tìm thấy vùng');
            }

            let byLevel = function (lhs, rhs) {
                return lhs.level - rhs.level;
            };

            srcZone.sort(byLevel);
            dstZone.sort(byLevel);

            if (srcZone.length !== dstZone.length) {
                throw new Error('Không tìm thấy tuyến');
            }

            for (let level = skipLevel0 ? 1 : 0; level < srcZone.length; level += 1) {
                if (srcZone[level].level === dstZone[level].level) {
                    let matchRoute = this.routes.find(
                        (route, index, array) => route.match(srcZone[level].name, dstZone[level].name));

                    if (matchRoute) {
                        matchRoutes.push(matchRoute.name);
                    }
                } else {
                    throw new Error('Không tìm thấy tuyến');
                }
            }


            data.result.srcDistrict = districts[0];
            data.result.dstDistrict = districts[1];
            data.result.srcZone = srcZone;
            data.result.dstZone = dstZone;

            data.result.routeMatchs = matchRoutes;
            data.result.routeMatch = matchRoutes.join('_');
            return data;
        }
    );
}

function calculateWeight(data) {
    let orderWeight = data.order.weight;
    let measure = data.order.measure;

    if (measure) {
        let volume = measure.length * measure.width * measure.height;

        let orderVolumetricWeight = volume / this.volumetricDivisor;

        if (orderVolumetricWeight > orderWeight) {
            orderWeight = orderVolumetricWeight;

            data.result.volumetricWeight = true;
        }
    }

    data.result.orderWeight = orderWeight;
    return data;
}

function lookupHelper(route, charges, value) {
    if (route === undefined) {
        throw new Error('routeMatch is not defined');
    }

    let charge = charges.find((charge, index, array) =>
    charge.routes.indexOf(route) > -1);

    if (charge === undefined) {
        throw new Error('Not found charges for route ' + route);
    }

    return stairLookup(charge, value);
}

function calculateChargeByWeight(data) {
    if (data.result.orderWeight === undefined) {
        throw new Error('orderWeight is not defined');
    }

    let result = lookupHelper(data.result.routeMatch,
        this.chargeByWeight, data.result.orderWeight);

    if (result) {
        if (result.level) {
            data.result.orderWeightLevel = result.level;
        }

        data.result.orderWeightUpper = result.upper;
        data.result.chargeByWeight = result.value;
        data.result.totalCharge += result.value;
    }

    return data;
}

function calculateChargeByCOD(data) {
    if (this.chargeByCOD && data.order.cashOnDelivery) {

        let result = lookupHelper(data.result.routeMatch,
            this.chargeByCOD, data.order.cashOnDelivery);

        if (result) {
            if (result.level) {
                data.result.orderCODLevel = result.level;
            }

            data.result.orderCODUpper = result.upper;
            data.result.chargeByCOD = result.value;
            data.result.totalCharge += result.value;
        }
    }
    return data;
}

function calculateMainCharge(data) {
    let chargesKey = this.mainCharge || ['chargeWeight'];

    data.result.mainCharge = 0;
    for (let key of chargesKey) {
        if (data.result.hasOwnProperty(key)) {
            data.result.mainCharge += data.result[key];
        }
    }

    return data;
}

function runTasks(data) {
    if (this.tasks) {
        for (let task of this.tasks) {
            task.call(this, data.order, data.result);
        }
    }

    return data;
}

class Engine {
    constructor(province, district, transportPackage) {
        this.province = province;
        this.district = district;
        this.transportPackage = transportPackage;
    }

    processOrder(order) {
        return new Promise((resolver, reject) => {

            let data = {
                packageName: this.transportPackage.name,
                order: order,
                result: {totalCharge: 0}
            };

            return fineZone.call(this.transportPackage,
                this.province, this.district, data)
                .then(calculateWeight.bind(this.transportPackage))
                .then(calculateChargeByWeight.bind(this.transportPackage))
                .then(calculateChargeByCOD.bind(this.transportPackage))
                .then(calculateMainCharge.bind(this.transportPackage))
                .then(runTasks.bind(this.transportPackage))
                .then(resolver)
                .catch((error) => {
                    data.error = error;
                    resolver(data);
                });
        });
    }
}

module.exports = Engine;