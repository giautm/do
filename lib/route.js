"use strict";
/* global module */

class Route {
    constructor(name, level, data) {
        this.name = name;
        this.level = level;
        this.data = data;
    }

    match(srcZone, dstZone) {
        return this.data.some((route, index, array) => route.src === srcZone && route.dst === dstZone);
    }
}

module.exports = function (options, data) {
    return new Route(options.name, options.level, data);
};
