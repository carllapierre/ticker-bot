const Discord = require('discord.js')
const request = require('sync-request')

const TICKER_PULL_INTERVAL_SEC = 4

exports.init = (client) => {
    refreshTicker(client)
    setInterval(function() {
        refreshTicker(client)
    }, 1000*TICKER_PULL_INTERVAL_SEC);
}

function refreshTicker(client) {    

    var price = getTickerInfo().lastPrice;

    if(price >= 1)
        price = Number.parseFloat(price).toFixed(4)
    price = Number.parseFloat(price).toPrecision(4)

    client.user.setActivity('$'+ price, { type: 'WATCHING' })
}

function getTickerInfo() {
    var res= request('GET',`https://api.binance.com/api/v3/ticker/24hr?symbol=${process.env.TICKER+"USDT"}`)
    return JSON.parse(res.getBody('utf8'))
}