const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Mostra informações sobre esse server.'),
	async execute(interaction) {
		return interaction.reply(`Nome do server: ${interaction.guild.name}\nTotal de membros: ${interaction.guild.memberCount}`);
	},
};