const axios = require('axios')
const { WeatherQuery } = require('../../config.json');
const logger = require("../../logs.js");
var Weather;
const init = async (weather) => {
    Weather = weather;
    setTimeout(()=>{
        logger.moduleInfo("Checando \x1b[1mPrevisões do tempo\x1b[0m...")
        checkWeather();
        loop();
    }, 1000)
}

const loop = () => {
    setTimeout(() => {
        logger.moduleInfo("Checando \x1b[1mCotações de Moedas\x1b[0m...")
        checkWeather();
        loop();
    }, 6 * 60 * 60 * 1000);
}

const checkWeather = async () => {
    Weather.forEach(channel => {
        var message = "☂️ **Clima Atual** ☀️\n\n";
        WeatherQuery.forEach((element, key) => {
            var url = `http://api.weatherapi.com/v1/current.json?key=678d5d968eb94f6c94c201816220206&q=${element}&aqi=no&lang=pt`
            axios
            .get(url)
            .then(res => {
                var data = res.data;
                message = message + `**${data.location.name}**
                > Clima atual: ${data.current.condition.text}
                > Temperatura: ${data.current.temp_c}°c (Sensação Térmica: ${data.current.feelslike_c}°c)
                > Velocidade do vento: ${data.current.wind_kph} km/h
                > Pressão: ${(parseFloat(data.current.pressure_mb)/1013).toFixed(2)} atm
                > Umidade: ${data.current.humidity}%\n\n`;

                if (key == WeatherQuery.length - 1) {
                    channel.messages.fetch(channel.lastMessageId)
                    .then(oldMessage => {
                        oldMessage.first().edit(message);
                        logger.moduleInfo(`\x1b[1mPrevisões do tempo\x1b[0m\x1b[33m para o servidor \x1b[1m${channel.guild.name}\x1b[0m.`)
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => {
                console.log(err);
            })
        });
    })
    


}

const update = async(channels) => {
    Weather = channels;
    checkWeather();
}

module.exports =  { init, update };
