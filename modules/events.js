//imports modules
const Discord = require('discord.js');

// Define variables
const { promisify} = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = async client => {

    let events = new Discord.Collection();
    const eventsFiles = await readdir("././events/");

    console.log("<=================> Events <=================>");

    eventsFiles.forEach(file =>{
        const eventName = file.split(".")[0];
        const event = require(`../events/${file}`);

        events.set(eventName, event);

        client.on(eventName, event.bind(null, client));

        // Log that the event is loading
        console.log(`Loading event: ${eventName} (${events.size.toString()}/${eventsFiles.length})`);
    });

    console.log("<=================> Commands <=================>");

}