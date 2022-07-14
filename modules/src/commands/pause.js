const execute = (Bot, message, args) => {
  const queue = Bot.queues.get(message.guild.id);
  if (!queue) {
    return message.reply("não existe nenhuma música sendo reproduzida");
  }
  queue.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a reprodução de música atual",
  execute,
};