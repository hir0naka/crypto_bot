'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
const http = require('http');
const request = require('request');
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'xxxx',
    channelSecret: 'xxxx'
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    let mes = '';
    if (event.message.text === 'ビットコイン' || event.message.text === 'BTC') {
        mes = '調査中';
        bitcoin(event.source.userId);
    } else if (event.message.text === 'イーサリアム' || event.message.text === 'ETH') {
        mes = '調査中';
        ETH(event.source.userId);
    } else if (event.message.text === 'イーサリアムクラシック' || event.message.text === 'ETC') {
        mes = '調査中';
        ETC(event.source.userId);
    } else if (event.message.text === 'リスク' || event.message.text === 'LSK') {
        mes = '調査中';
        LSK(event.source.userId);
    } else if (event.message.text === 'ファクトム' || event.message.text === 'FCT') {
        mes = '調査中';
        FCT(event.source.userId);
    } else if (event.message.text === 'モネロ' || event.message.text === 'XMR') {
        mes = '調査中';
        XMR(event.source.userId);
    } else if (event.message.text === 'オーガー' || event.message.text === 'REP') {
        mes = '調査中';
        REP(event.source.userId);
    } else if (event.message.text === 'リップル' || event.message.text === 'XRP') {
        mes = '調査中';
        XRP(event.source.userId);
    } else if (event.message.text === 'ジーキャッシュ' || event.message.text === 'ZEC') {
        mes = '調査中';
        ZEC(event.source.userId);
    } else if (event.message.text === 'ネム' || event.message.text === 'XEM') {
        mes = '調査中';
        XEM(event.source.userId);
    } else if (event.message.text === 'ライトコイン' || event.message.text === 'LTC') {
        mes = '調査中';
        LTC(event.source.userId);
    } else if (event.message.text === 'ダッシュ' || event.message.text === 'DASH') {
        mes = '調査中';
        DASH(event.source.userId);
    } else if (event.message.text === 'ビットコインキャッシュ' || event.message.text === 'BCH') {
        mes = '調査中';
        BCH(event.source.userId);
    } else {
        mes = event.message.text;
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: mes
    });
}

let URL = 'http://api.bitflyer.jp/v1/ticker';

const bitcoin = async(userId) => {
    http.get(URL, (res) => {
        var body = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);
            console.log(res);

            client.pushMessage(userId, {
                type: 'text',
                text: `現在のビットコインの価格は${res.ltp}円です`,
            });
        });
    });
}

const ETH = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/eth_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のイーサリアムの価格は${body.rate}円です`
        });
    });
}

const ETC = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/etc_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のイーサリアムクラシックの価格は${body.rate}円です`
        });
    });
}

const LSK = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/lsk_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のリスクの価格は${body.rate}円です`
        });
    });
}

const FCT = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/fct_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のファクトムの価格は${body.rate}円です`
        });
    });
}

const XMR = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/xmr_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のモネロの価格は${body.rate}円です`
        });
    });
}

const REP = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/rep_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のオーガーの価格は${body.rate}円です`
        });
    });
}

const XRP = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/xrp_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のリップルの価格は${body.rate}円です`
        });
    });
}

const ZEC = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/zec_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のジーキャッシュの価格は${body.rate}円です`
        });
    });
}

const XEM = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/xem_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のネムの価格は${body.rate}円です`
        });
    });
}

const LTC = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/ltc_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のライトコインの価格は${body.rate}円です`
        });
    });
}

const DASH = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/dash_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のダッシュの価格は${body.rate}円です`
        });
    });
}

const BCH = async(userId) => {
    request.get({
        url: "https://coincheck.jp/api/rate/bch_jpy",
        json: true
    }, (err, res, body) => {
        client.pushMessage(userId, {
            type: 'text',
            text: `現在のビットコインキャッシュの価格は${body.rate}円です`
        });
    });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
