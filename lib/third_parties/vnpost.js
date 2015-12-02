/**
 * Created by giau.tran on 02/12/2015.
 */
'use strict';
/* global module */

let Provinces = require('./../provinces.js');

let MIEN_BAC = [
    Provinces.BAC_KAN,
    Provinces.BAC_GIANG,
    Provinces.BAC_NINH,
    Provinces.CAO_BANG,
    Provinces.DIEN_BIEN,
    Provinces.HA_GIANG,
    Provinces.HA_NAM,
    Provinces.HA_TINH,
    Provinces.HAI_DUONG,
    Provinces.HAI_PHONG,
    Provinces.HUNG_YEN,
    Provinces.HOA_BINH,
    Provinces.LAO_CAI,
    Provinces.LAI_CHAU,
    Provinces.LANG_SON,
    Provinces.NAM_DINH,
    Provinces.NGHE_AN,
    Provinces.NINH_BINH,
    Provinces.PHU_THO,
    Provinces.QUANG_NINH,
    Provinces.QUANG_BINH,
    Provinces.SON_LA,
    Provinces.THAI_BINH,
    Provinces.THAI_NGUYEN,
    Provinces.THANH_HOA,
    Provinces.TUYEN_QUANG,
    Provinces.VINH_PHUC,
    Provinces.YEN_BAI
];

let MIEN_TRUNG = [
    Provinces.DA_NANG,
    Provinces.BINH_DINH,
    Provinces.GIA_LAI,
    Provinces.THUA_THIEN_HUE,
    Provinces.KON_TUM,
    Provinces.PHU_YEN,
    Provinces.QUANG_TRI,
    Provinces.QUANG_NAM,
    Provinces.QUANG_NGAI,
    Provinces.DAK_LAK,
    Provinces.DAK_NONG
];

let MIEN_NAM = [
    Provinces.TP_HO_CHI_MINH,
    Provinces.AN_GIANG,
    Provinces.BINH_DUONG,
    Provinces.BINH_PHUOC,
    Provinces.BA_RIA_VUNG_TAU,
    Provinces.BAC_LIEU,
    Provinces.BEN_TRE,
    Provinces.BINH_THUAN,
    Provinces.CA_MAU,
    Provinces.CAN_THO,
    Provinces.DONG_NAI,
    Provinces.DONG_THAP,
    Provinces.HAU_GIANG,
    Provinces.KIEN_GIANG,
    Provinces.KHANH_HOA,
    Provinces.LONG_AN,
    Provinces.LAM_DONG,
    Provinces.NINH_THUAN,
    Provinces.SOC_TRANG,
    Provinces.TAY_NINH,
    Provinces.TIEN_GIANG,
    Provinces.TRA_VINH,
    Provinces.VINH_LONG
];

module.exports.MIEN_NAM = MIEN_NAM;
module.exports.MIEN_BAC = MIEN_BAC;
module.exports.MIEN_TRUNG = MIEN_TRUNG;

module.exports.calculateChargeRate = function calculateChargeRate(order, result) {
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
};

module.exports.calculateSurcharges = function calculateSurcharges(order, result) {
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
};