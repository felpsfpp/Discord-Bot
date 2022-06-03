const { Client, Intents } = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {

	console.log(`Logged in as ${client.user.tag}`);

});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    let text = msg.content;

    if (!text.startsWith(prefix)) return;

    text = text.replace('!', '');
    const args = text.split(" ");
    switch (args[0].toLowerCase()) {
		case 'ping':
			msg.channel.send('Pong.');
		return
	}
})

client.login(token);