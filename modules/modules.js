var cotation = require("./src/cotation");
var weather = require("./src/weather");
var holidays = require("./src/holidays");
const logger = require("../logs.js")

const init = async (channels) => {
    if(channels.holidays) {
        logger.moduleStarting("Feriados");
        await holidays.init(channels.holidays);
        logger.moduleStarted("Feriados");
    }


    logger.moduleStarting("Previsão do tempo");
    await weather.init(channels.weather);
    logger.moduleStarted("Previsão do tempo");

    logger.moduleStarting("Cotações");
    await cotation.init(channels.cotation);
    logger.moduleStarted("Cotações");
}

const update = async (channels) => {
    await holidays.update(channels.holidays);
    await weather.update(channels.weather);
    await cotation.update(channels.cotation);
}

module.exports = { init, update };