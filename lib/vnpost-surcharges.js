"use strict";
/* global module */

function calculateSurcharges(order, result) {
    if (this.surcharges) {
        let routeName = result.routeMatch;

        for (let surchargerName in this.surcharges) {
            if (this.surcharges[surchargerName].hasOwnProperty(routeName)) {
                let surcharge = this.surcharges[surchargerName][routeName];

                result[surchargerName + 'Surcharge'] = surcharge;

                // Phụ thu dựa trên cước vận chuyển chính.
                result.totalCharge += result.mainCharge * surcharge;
            }
        }
    }
}

module.exports = calculateSurcharges;