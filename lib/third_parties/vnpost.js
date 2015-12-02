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