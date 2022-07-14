const axios = require('axios');
const logger = require("../../logs.js");
var Holidays;
const init = async (channels) => {
    Holidays = channels;
    setTimeout(()=> {
        logger.moduleInfo("Checando \x1b[1mFeriados\x1b[0m...")
        checkHolidays();
        loop();
    }, 1000)
}

const loop = () => {
    setTimeout(() => {
        logger.moduleInfo("Checando \x1b[1mCotações de Moedas\x1b[0m...")
        checkHolidays();
        loop();
    }, 24 * 60 * 60 * 1000);
}

const formatRemainingDays = (days) => {
    var ret;
    var months;
    if (days > 30) {
        months = Math.floor(parseInt(days/30));
        ret = `${months} ${months > 1 ? "meses" : "mes"}`
    } else {
        return `${days} ${days > 1 ? "dias" : "dia" }`
    }
    days = days - (months*30);
    if (days > 0) {
        ret = ret + ` e ${days} ${days > 1 ? "dias" : "dia" }`
    }

    return ret;
}

const checkHolidays = async () => {
    Holidays.forEach(channel=> {  
        var message = "**Feriados Nacionais** 🎁\n\n";
        var date = new Date();
        var url = `https://brasilapi.com.br/api/feriados/v1/${date.getFullYear()}`
        axios
        .get(url)
        .then(res => {
            var data = res.data;
            var holidays = data.filter((value) => {
                var thisDate = new Date(value.date);
                return thisDate > date;
            })

            var nextHoliday = holidays[0];
            var ms = new Date(nextHoliday.date) - date;
            var days = Math.ceil(ms / (1000 * 60 * 60 * 24))
            message = message + `⏳ **Próximo Feriado**
            > ${nextHoliday.name}
            > Faltam aproximadamente ${formatRemainingDays(days)} ${days > 30 ? `, ou ${days} dias` : ""}`

            holidays.shift();

            message = message + "\n\nℹ️ **Outros Feriados**"

            holidays.forEach(element => {
                var ms = new Date(element.date) - date;
                var days = Math.ceil(ms / (1000 * 60 * 60 * 24))
                message = message + `
                > **${element.name}**, Ainda faltam aproximadamente **${formatRemainingDays(days)}** ${days > 30 ? `, *ou ${days} dias*` : ""}`
            });

            channel.messages.fetch(channel.lastMessageId)
            .then(oldMessage => {
                oldMessage.first().edit(message);
                logger.moduleInfo(`\x1b[1mFeriados\x1b[0m\x1b[33m enviados para o servidor \x1b[1m${channel.guild.name}\x1b[0m.`)
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
            logger.error(err);
        })
    })
}

const update = async(channels) => {
    Holidays = channels;
    checkHolidays();
}

module.exports =  { init, update };
