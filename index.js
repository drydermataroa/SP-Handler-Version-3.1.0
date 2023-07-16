const { Client, Collection } = require("discord.js");
const config = require("./settings/config.json")
const fs = require('fs');

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// // Initializing the project
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });

client.login(config.token);