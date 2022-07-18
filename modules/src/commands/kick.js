const logger = require("../../../logs.js");
const execute = (Bot, message, args) => {
	const user = message.mentions.users.first();
	if (message.content.startsWith('!kick')) {
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
			member
			  .kick('Razão do kick')
			  .then(() => {
				message.reply(`Kickei o ${user}`);
			  })
			  .catch(err => {
				message.reply('Erro');
				console.error(err);
			  });
		  } else {
			message.reply("Esse usuario não está nesse server");
		  }
		} else {
		  message.reply("Você não mencionou o usuario a ser kickado!");
		}
	  }
	};

module.exports = {
		name: "kick",
		help: "Selecione o membro que será kikado (nao vai kikar de verdade).",
		execute,
};