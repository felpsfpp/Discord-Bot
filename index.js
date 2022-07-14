const Discord = require('discord.js');
const fs = require("fs");
const path = require("path");
const logger = require("./logs.js")
const modules = require("./modules/modules.js");
const { prefix, token, EnabledModules } = require('./config.json');

const Bot = new Discord.Client();
Bot.commands = new Discord.Collection();
Bot.queues = new Map();

const commandFiles = fs
.readdirSync(path.join(__dirname,"/modules/src/commands"))
.filter(filename => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./modules/src/commands/${filename}`);
  Bot.commands.set(command.name, command);
}

 Bot.once('ready', async (client) => {

  var servers = "";
    for (const guild of Bot.guilds.cache.array()) {
      servers = servers + (servers === "" ? guild.name : ", "+guild.name);
    }

    logger.serversMessage(servers);
    var channels = await getChannels();
    logger.info("iniciando módulos...");
    await modules.init(channels);
    logger.success("Bot iniciado");
});

const fetchThisChannel = async (ret, args, channel) => {
  if (channel.name.search(args[0]) !== -1) {
      await Bot.channels.fetch(channel.id)
      .then(thisChn => {
          ret[args[1]].push(thisChn.messages.channel)
      })
  }
}

const forEachChannel = async(element, ret, channel) => {
  var args = element.split('@');
  await fetchThisChannel(ret, args, channel); 
}

const fetchChannels = async (channel, ret) => {
  EnabledModules.forEach(element => forEachChannel(element, ret, channel));
}
const getChannels = async () => {
  let channels = Bot.channels.cache.array();
  var ret = {
      cotation: [],
      holidays: [],
      weather: []
  }
  for (const channel of channels) 
  {
      await fetchChannels(channel, ret);
  }

  return ret;
}

const createChannel = async (guild, element) => {
  var args = element.split('@')
  guild.channels.create(args[0], { reason: 'Criação dos chats!' })
  .then( (GuildChannel) => {
      logger.info(`Canal criado ${GuildChannel.name} no servidor ${guild.name}`)
      GuildChannel.send("Canal criado!");
  })
  .catch(console.error);
}

const updateModules = async () => {
  await modules.update(await getChannels());
}

Bot.on('guildCreate', async (guild) => {
  logger.join(guild.name);
  logger.info('Criando canais...');
  EnabledModules.forEach(element => createChannel(guild, element));

  setTimeout(()=>{
      logger.info('Atualizando módulos...');
      updateModules();
      logger.info('Módulos atualizados.');
  }, 5000);

})

Bot.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift();

  try {
  Bot.commands.get(command).execute(Bot, message, args);
  } catch(e) {
    return message.reply("não conheço esse comando");
  }
});

Bot.login(token);