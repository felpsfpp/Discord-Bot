const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const play = require("./src/play.js");
const getMusicFromURI = require("./src/extractURI.js");

// carrega o token e prefixo
const { token,prefix } = require('./config.json');

client.once("ready", () => {

    console.log(`Logged in as ${client.user.tag}`);

});

client.on('message', async (msg) => {

    isCommand = msg.content.startsWith(prefix);

    if (!isCommand) return;

    command = msg.content.split(prefix)[1].split(" ")[0];
    args = msg.content.split(" ")[1];

    console.log(`args = ${args}`); // debug

    if (command == 'ping') {    
        message.channel.send(`pong`);
    }
});


client.login(token);
