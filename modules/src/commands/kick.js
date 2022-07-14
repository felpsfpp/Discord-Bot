const execute = (Bot, message, args) => {
};

module.exports = {
		name: "kick",
		help: "Selecione o membro que será kikado (nao vai kikar de verdade).",
	async execute(interaction) {
		const user = interaction.options.getUser('usuario');
		return interaction.reply({ content: `Você quer kikar: ${user.username}`, ephemeral: true });
	},
};