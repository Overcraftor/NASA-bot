const Discord = require('disitcord.js');
const client = new Discord.Client();

client.config = require("./config.json");
require("./modules/functions")(client);
require("./modules/events")(client);
require("./modules/commands")(client);

client.login(process.env.TOKEN).then();