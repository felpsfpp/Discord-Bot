const execute = (Bot, message, args) => {
    const queue = Bot.queues.get(message.guild.id);
    if (!queue) {
      return message.reply("não existe nenhuma música sendo reproduzida");
    }
    queue.dispatcher.resume();
  };
  
  module.exports = {
    name: "resume",
    help: "Continua a reprodução de música atual",
    execute,
  };