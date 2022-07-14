const execute = (Bot, message, args) => {
  const queue = Bot.queues.get(message.guild.id);
  if (!queue) {
    return message.reply("não existe nenhuma música sendo reproduzida");
  }
  queue.songs = [];
  Bot.queues.set(message.guild.id, queue);
  queue.dispatcher.end();
};

module.exports = {
  name: "stop",
  help: "Para a reprodução de músicas no servidor",
  execute,
};