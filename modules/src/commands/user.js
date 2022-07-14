const execute = (Bot, message, args) => {
  };
module.exports = {
		name: "user",
		help: "Mostra informações do se usuario.",
	async execute(interaction) {
		return message.reply(`Seu nome: ${interaction.user.username}\nSeu ID: ${interaction.user.id}`);
	},
};