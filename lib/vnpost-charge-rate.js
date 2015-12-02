"use strict";
/* global module */

function calculateChargeRate(order, result) {
    let orderWeight = order.weight;
    let measure = order.measure;

    if (measure && !result.volumetricWeight) {
        /*
         ## Hệ số tính cước đối với hàng đặc biệt

         *Chỉ áp dụng khi tính cước theo trọng lượng thực tế.*

         |STT|Loại hàng                     |Hệ số tính cước|
         |--:|:-----------------------------|--------------:|
         |  1|Hàng cồng kềnh                |           1,4 |
         |  2|Hàng nặng (bưu gửi >30kg/kiện)|           1,4 |
         |  3|Hàng dễ vỡ                    |           1,6 |
         |  4|Hàng hóa gửi đi các hải đảo   |             2 |

         - **Quy định xác định hàng cồng kềnh**: Hàng cồng kềnh là hàng gửi
         có chu vi lớn nhất cộng với số đo của chiều còn lại lớn hơn 3m
         và nhỏ hơn 5m, hoặc chiều dài nhất của bưu gửi lớn hơn 1,5m và
         nhỏ hơn 2m.
         */

        if (this.chargesRate.bulky) {
            let maxSide1 = measure.height + measure.length + measure.width + Math.max(
                    measure.height + measure.length,
                    measure.height + measure.width,
                    measure.length + measure.width);

            let maxSide2 = Math.max(measure.height, measure.length, measure.width);

            if ((300 < maxSide1 && maxSide1 < 500) ||
                (150 < maxSide2 && maxSide2 < 200) ||
                (order.packages && orderWeight / order.packages > 30)) {
                result.isBulky = true;
                result.chargeRate = chargesRate.bulky;
            }
        }

        if (this.chargesRate.fragile && order.isFragile) {
            result.isFragile = true;
            result.chargeRate = this.chargesRate.fragile;
        }

        // TODO: Review, Hàng gửi hải đảo, hệ số = 2.
        if (this.chargesRate.destinationIsland && result.dstDistrict.districtName.indexOf('Huyện đảo') > -1) {
            result.destinationIsland = true;
            result.chargeRate = this.chargesRate.destinationIsland;
        }

        if (result.chargeRate) {
            result.totalCharge += result.mainCharge * result.chargeRate;
        }
    }
}


module.exports = calculateChargeRate;