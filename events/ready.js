const tickerService = require('../services/service-ticker')

module.exports = (client) => {
    tickerService.init(client)
}