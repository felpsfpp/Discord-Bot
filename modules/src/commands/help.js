const execute = (Bot, message, args) => {
    let string = "**===== AJUDA =====**\n\n";
    Bot.commands.forEach((command) => {
      if (command.help) {
        string += `**${command.name}**: ${command.help}\n`;
      }
    });
    return message.channel.send(string);
  };
  
  module.exports = {
    name: "help",
    help: "Exibe a ajuda de todos os comandos",
    execute,
  };