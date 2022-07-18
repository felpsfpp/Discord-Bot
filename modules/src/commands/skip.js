const playSong = require("./play").playSong;

const execute = (Bot, message, args) => {
  const queue = Bot.queues.get(message.guild.id);
  if (!queue) {
    return msg.reply("Não existe nenhuma música sendo reproduzida");
  }
  queue.songs.shift();
  Bot.queues.set(message.guild.id, queue);
  playSong(Bot, message, queue.songs[0]);
};

module.exports = {
  name: "skip",
  help: "Pula para a próxima música",
  execute,
};