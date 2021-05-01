const Discord = require('discord.js');

const { promisify} = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = async (client) =>{

    console.log(`Default commands prefix: ${client.config.prefix}`)

    client.commands = new Discord.Collection();
    client.categories = new Discord.Collection();
    const commandsFiles = await readdir("././commands");

    commandsFiles.forEach(file =>{
        const command = require(`../commands/${file}`);

        client.commands.set(command.name.toLowerCase(), command);

        if(!client.categories.has(command.category))
            client.categories.set(command.category, [command]);
        else
            client.categories.get(command.category).push(command);


        console.log(`Loading command: ${command.name} (${client.commands.size.toString()}/${commandsFiles.length})`)
    });

    console.log("<===============================================>");
}