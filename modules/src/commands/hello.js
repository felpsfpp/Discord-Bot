const execute = (Bot, message, args) => {
    return message.reply("Hello");
  };
  
  module.exports = {
    name: "hello",
    help: "Hello, world!",
    execute,
  };