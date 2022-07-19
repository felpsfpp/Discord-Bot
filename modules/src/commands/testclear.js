const deletemensage = async(Bot, message, value) => {
    await message.channel.bulkDelete(value + 1)
        .catch(err => console.log(err))
};
 const execute = async (Bot, message, args) => {
    if(!args[0]) return message.channel.send('Por Favor especifique o numero de mensagens a serem deletadas de 1 - 99')
        if(isNaN(args[0])) return message.channel.send('Somente numeros são permitidos')
        if(parseInt(args[0]) > 200) return message.channel.send('a quantidade maxima de mensagens que posso deletar é 99')
        const rounds = parseInt(args[0])/99
        console.log(rounds)
        for (var i = 1; i < Math.round(rounds); i++){
            deletemensage(Bot, message, 99*(rounds-i))
        }
                message.channel.send('Deletei ' + args[0]  + " messagens.")
  };
  
module.exports = {
    name : 'testclear',
    help: "Apaga até 99 mensagens",
    execute,
};