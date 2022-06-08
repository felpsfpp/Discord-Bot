const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa até 99 menssagens.')
		.addIntegerOption(option => option.setName('quantidade').setDescription('Numero de mensagens para apagar')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('quantidade');

		if (amount < 1 || amount > 99) {
			return interaction.reply({ content: 'Você precisa colocar um numero de 1 a 99.', ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Erro!', ephemeral: true });
		});

		return interaction.reply({ content: `Apaguei \`${amount}\` mensagens.`, ephemeral: false });
	},
};