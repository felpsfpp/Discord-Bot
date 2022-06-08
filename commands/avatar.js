const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Mostra o URL do usuario selecionado ou o seu.')
		.addUserOption(option => option.setName('usuario').setDescription('O usuario(s) que mostrara avatar')),
	async execute(interaction) {
		const user = interaction.options.getUser('usuario');
		if (user) return interaction.reply(`avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
	},
};