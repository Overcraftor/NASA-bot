const Discord = require("discord.js");

module.exports = (client, message) =>{
    const args = message.content.substring(client.config.prefix.length, message.content.length).split(/ +/g);

    if(!message.author.bot && message.content.startsWith(client.config.prefix)){
        if(!checkChannel(client, message))
            return;

        if(message.content.length === client.config.prefix.length){
            unknownCommandError(client, message)
            return;
        }

        const command = client.getCommand(args.shift().toLowerCase());

        if(command){

            if(!command.isMp && message.channel.type.dm){
                message.channel.send(
                    client.newEmbed("failure", message.author, "Veuillez vous rendre sur un serveur.")
                ).then(msg =>{
                    msg.delete({timeout: 5000});
                });
                return;
            }

            command.execute(message, args, client);
            if(command.deleteMessage)
                message.delete();
        }else{
            unknownCommandError(client, message);
        }
    }

    message.mentions.users.forEach((key) =>{
        if(key.id !== client.user.id)
            return;
        if(checkChannel(client, message)){
            message.channel.send(
                client.newEmbed("info", message.author, `Faites ${client.config.prefix}help pour afficher la liste des commandes.`)
            );
        }
    });
}

function unknownCommandError(client, message){
    message.channel.send(
        client.newEmbed("error", message.author, "Commande inconnue", `Fais ${client.config.prefix}help pour afficher la liste des commandes.`)
    );
}

function checkChannel(client, message){
    if(message.channel.type === 'dm')
        return false;
    if(!client.config.allowedCommandChannels.includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(
            client.newEmbed("failure", message.author, "Veuillez vous rendre dans un salon valide.")
        ).then(msg =>{
            msg.delete({timeout: 5000});
        });
        return false;
    }
    return true;
}