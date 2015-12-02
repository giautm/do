/**
 * Created by giau.tran on 02/12/2015.
 */
'use strict';
/* global module */

let Provinces = require('./../provinces.js');

let Zone = require('../zone.js');
let Route = require('../route.js');

let MIEN_BAC_STAR = [
    Provinces.HA_NOI
];
let MIEN_BAC = [
    Provinces.LAO_CAI,
    Provinces.YEN_BAI,
    Provinces.DIEN_BIEN,
    Provinces.HOA_BINH,
    Provinces.LAI_CHAU,
    Provinces.SON_LA,
    Provinces.HA_GIANG,
    Provinces.CAO_BANG,
    Provinces.BAC_KAN,
    Provinces.LANG_SON,
    Provinces.TUYEN_QUANG,
    Provinces.THAI_NGUYEN,
    Provinces.PHU_THO,
    Provinces.BAC_GIANG,
    Provinces.QUANG_NINH,
    Provinces.BAC_NINH,
    Provinces.HA_NAM,
    Provinces.HAI_DUONG,
    Provinces.HAI_PHONG,
    Provinces.HUNG_YEN,
    Provinces.NAM_DINH,
    Provinces.NINH_BINH,
    Provinces.THAI_BINH,
    Provinces.VINH_PHUC,
    Provinces.THANH_HOA,
    Provinces.NGHE_AN,
    Provinces.HA_TINH
];

let MIEN_TRUNG_STAR = [
    Provinces.DA_NANG
];
let MIEN_TRUNG = [
    Provinces.QUANG_BINH,
    Provinces.QUANG_TRI,
    Provinces.THUA_THIEN_HUE,
    Provinces.QUANG_NAM,
    Provinces.QUANG_NGAI,
    Provinces.BINH_DINH,
    Provinces.PHU_YEN,
    Provinces.KHANH_HOA,
    Provinces.NINH_THUAN,
    Provinces.BINH_THUAN,
    Provinces.KON_TUM,
    Provinces.GIA_LAI,
    Provinces.DAK_LAK,
    Provinces.DAK_NONG,
    Provinces.LAM_DONG
];

let MIEN_NAM_STAR = [
    Provinces.TP_HO_CHI_MINH
];
let MIEN_NAM = [
    Provinces.BINH_PHUOC,
    Provinces.BINH_DUONG,
    Provinces.DONG_NAI,
    Provinces.TAY_NINH,
    Provinces.BA_RIA_VUNG_TAU,
    Provinces.LONG_AN,
    Provinces.DONG_THAP,
    Provinces.TIEN_GIANG,
    Provinces.AN_GIANG,
    Provinces.BEN_TRE,
    Provinces.VINH_LONG,
    Provinces.TRA_VINH,
    Provinces.HAU_GIANG,
    Provinces.KIEN_GIANG,
    Provinces.SOC_TRANG,
    Provinces.BAC_LIEU,
    Provinces.CA_MAU,
    Provinces.CAN_THO
];

let STANDARD_ZONES = [
    Zone.Province('mien-bac', MIEN_BAC),
    Zone.Province('mien-trung', MIEN_TRUNG),
    Zone.Province('mien-nam', MIEN_NAM),

    Zone.Province('mien-bac-star', MIEN_BAC_STAR),
    Zone.Province('mien-trung-star', MIEN_TRUNG_STAR),
    Zone.Province('mien-nam-star', MIEN_NAM_STAR)
];

let STANDARD_ROUTES = [
    Route({name: 'noi-vung', level: 0}, [
        {src: 'mien-bac', dst: 'mien-bac'},
        {src: 'mien-trung', dst: 'mien-trung'},
        {src: 'mien-nam', dst: 'mien-nam'},

        {src: 'mien-bac-star', dst: 'mien-bac'},
        {src: 'mien-trung-star', dst: 'mien-trung'},
        {src: 'mien-nam-star', dst: 'mien-nam'}
    ]),
    Route({name: 'lien-vung', level: 1}, [
        {src: 'mien-bac', dst: 'mien-trung'},
        {src: 'mien-trung', dst: 'mien-bac'},
        {src: 'mien-trung', dst: 'mien-nam'},
        {src: 'mien-nam', dst: 'mien-trung'},

        {src: 'mien-bac-star', dst: 'mien-trung'},
        {src: 'mien-trung-star', dst: 'mien-bac'},
        {src: 'mien-trung-star', dst: 'mien-nam'},
        {src: 'mien-nam-star', dst: 'mien-trung'}
    ]),
    Route({name: 'cach-vung', level: 2}, [
        {src: 'mien-bac', dst: 'mien-nam'},
        {src: 'mien-nam', dst: 'mien-bac'},

        {src: 'mien-bac-star', dst: 'mien-nam'},
        {src: 'mien-nam-star', dst: 'mien-bac'}
    ]),

    Route({name: 'noi-vung-star', level: 0}, [
        {src: 'mien-bac', dst: 'mien-bac-star'},
        {src: 'mien-trung', dst: 'mien-trung-star'},
        {src: 'mien-bac', dst: 'mien-nam-star'},

        {src: 'mien-bac-star', dst: 'mien-bac-star'},
        {src: 'mien-trung-star', dst: 'mien-trung-star'},
        {src: 'mien-bac-star', dst: 'mien-nam-star'}
    ]),
    Route({name: 'lien-vung-star', level: 1}, [
        {src: 'mien-bac', dst: 'mien-trung-star'},
        {src: 'mien-trung', dst: 'mien-bac-star'},
        {src: 'mien-trung', dst: 'mien-nam-star'},
        {src: 'mien-nam', dst: 'mien-trung-star'},
        {src: 'mien-bac-star', dst: 'mien-trung-star'},
        {src: 'mien-trung-star', dst: 'mien-bac-star'},
        {src: 'mien-trung-star', dst: 'mien-nam-star'},
        {src: 'mien-nam-star', dst: 'mien-trung-star'}
    ]),
    Route({name: 'cach-vung-star', level: 2}, [
        {src: 'mien-bac', dst: 'mien-nam-star'},
        {src: 'mien-nam', dst: 'mien-bac-star'},
        {src: 'mien-bac-star', dst: 'mien-nam-star'},
        {src: 'mien-nam-star', dst: 'mien-bac-star'}
    ])
];
module.exports.MIEN_NAM = MIEN_NAM;
module.exports.MIEN_BAC = MIEN_BAC;
module.exports.MIEN_TRUNG = MIEN_TRUNG;

module.exports.MIEN_NAM_STAR = MIEN_NAM_STAR;
module.exports.MIEN_BAC_STAR = MIEN_BAC_STAR;
module.exports.MIEN_TRUNG_STAR = MIEN_TRUNG_STAR;

module.exports.STANDARD_ZONES = STANDARD_ZONES;
module.exports.STANDARD_ROUTES = STANDARD_ROUTES;