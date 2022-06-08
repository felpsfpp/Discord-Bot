const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Selecione o membro que será kikado (nao vai kikar).')
		.addUserOption(option => option.setName('usuario').setDescription('Membro a ser kikado')),
	async execute(interaction) {
		const user = interaction.options.getUser('usuario');
		return interaction.reply({ content: `Você quer kikar: ${user.username}`, ephemeral: true });
	},
};