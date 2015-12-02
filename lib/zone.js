"use strict";
/* global module */

class Zone {
    constructor(name, type, data, level) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.level = level;
    }

    belong(district) {
        if (this.type === 'district') {
            return this.data.indexOf(district._id) > -1;
        }

        return this.data.indexOf(district.provinceId) > -1;
    }
}

module.exports.District = function (name, ids) {
    return new Zone(name, 'district', ids, 1);
};
module.exports.Province = function (name, ids) {
    return new Zone(name, 'province', ids, 0);
};