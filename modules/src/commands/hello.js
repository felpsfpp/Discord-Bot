const execute = (Bot, message, args) => {
    return message.reply("Hello, world");
  };
  
  module.exports = {
    name: "hello",
    help: "Hello, world!",
    execute,
  };