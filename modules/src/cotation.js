const axios = require('axios');
const logger = require("../../logs.js");

var Economic;
const init = async (economic) => {
    Economic = economic;
    setTimeout(()=>{
        logger.moduleInfo("Checando \x1b[1mCotações de Moedas\x1b[0m...")
        checkDol();
        loop();
    }, 1000)
}

const getEmojiForCurrency = (currency) => {
    switch(currency){
        case "EUR":
            return ":euro:";
        case "USD":
            return ":dollar:";
        default:
            return "";
    }
}

const loop = () => {
    setTimeout(() => {
        logger.moduleInfo("Checando \x1b[1mCotações de Moedas\x1b[0m...")
        checkDol();
        loop();
    }, 30 * 60 * 1000);
}

const checkDol = async () => {
    Economic.forEach((channel) => {
        axios
        .get("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL")
        .then(res => {
            var data = res.data;
            var message = "";
            for (var moeda in data) {
                var moedaData = data[moeda];
                var emoji = getEmojiForCurrency(moedaData.code);
                message = message + `\n**${emoji}**: R$ ${parseFloat(moedaData.bid).toFixed(2)}`;
            }

            channel.messages.fetch(channel.lastMessageId)
            .then(oldMessage => {
                var data = new Date();
                oldMessage.first().edit("**Cotações Atualizadas!**" + " " + message + `\n\n\n**🕛 ${data.toLocaleString("pt-BR")}**\n\nChecando novamente em 30min...`)
                logger.moduleInfo(`\x1b[1mCotações de Moedas\x1b[0m\x1b[33m enviadas para o servidor \x1b[1m${channel.guild.name}\x1b[0m.`)
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        })
    })
}

const update = async(channels) => {
    Economic = channels;
    checkDol();
}

module.exports =  { init, update };