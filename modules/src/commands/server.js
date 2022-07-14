const execute = (Bot, message, args) => {
  };

module.exports = {
		name: "server",
		help: "Mostra informações sobre esse server.",
	async execute(interaction) {
		return message.reply(`Nome do server: ${interaction.guild.name}\nTotal de membros: ${interaction.guild.memberCount}`);
	},
};