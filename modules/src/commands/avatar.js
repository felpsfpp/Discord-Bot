const execute = (Bot, message, args) => {
	return message.reply(message.author.displayAvatarURL());
};

module.exports = {
		name: "avatar",
		help: "Mostra o URL do seu usuario.",
		execute,
};