const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Mostra informações do se usuario.'),
	async execute(interaction) {
		return interaction.reply(`Seu nome: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`);
	},
};