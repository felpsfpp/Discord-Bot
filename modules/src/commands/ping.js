const execute = (Bot, message, args) => {
	return message.reply('Pong!');
};

module.exports = {
		name: "ping",
		help: "Pong!",
		execute,
};