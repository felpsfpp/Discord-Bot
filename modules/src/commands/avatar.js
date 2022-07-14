const execute = (Bot, message, args) => {
};

module.exports = {
		name: "avatar",
		help: "Mostra o URL do usuario selecionado ou o seu.",
	async execute(interaction) {
		const user = interaction.options.getUser('usuario');
		if (user) return message.reply(`avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
	},
};