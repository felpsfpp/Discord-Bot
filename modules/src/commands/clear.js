const execute = async (Bot, message, args) => {
    if(!args[0]) return message.channel.send('Por Favor especifique o numero de mensagens a serem deletadas de 1 - 99')
        if(isNaN(args[0])) return message.channel.send('Somente numeros são permitidos')
        if(parseInt(args[0]) > 99) return message.channel.send('a quantidade maxima de mensagens que posso deletar é 99')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send('Deletei ' + args[0]  + " messagens.")
  };
  
module.exports = {
    name : 'clear',
    help: "Apaga até 99 mensagens",
    execute,
};