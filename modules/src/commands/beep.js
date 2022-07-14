const execute = (Bot, message, args) => {
	return message.reply('Boop!');
};

module.exports = {
		name: "beep",
		help: "Beep!",
		execute,
};