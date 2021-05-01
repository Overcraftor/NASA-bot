module.exports = {
    name: "Help",
    category: "Informations",
    aliases: ["aide", "?"],
    description: "Permet de voir la liste des commandes disponibles.",
    deleteMessage: true,
    isMp: false,

    execute(message, args, client){
        const prefix = client.config.prefix;
        if(args.length === 0){
            const embed = client.newEmbed("info", message.author, `\n- Prefix: \`${prefix}\`\n- Commandes disponibles: `)

            client.categories.forEach((commands, category) =>{
                let commandsString = "";
                commands.forEach(cmd => {
                    commandsString += "\n**" + prefix + cmd.name.toLowerCase() + ":** " + cmd.description;
                });
                embed.addField(category + ":", commandsString + "\n")
            });

            embed.setFooter(embed.footer.text + ` - Fais ${prefix}help [command] pour avoir plus d'informations`, embed.footer.iconURL);
            message.channel.send(embed);
            return;
        }

        const cmd = client.getCommand(args[0].toLowerCase());
        if(!cmd){
            message.channel.send(
                client.newEmbed("error", message.author, "Commande inconnue", `Fais ${client.getGuildPrefix(message.guild)}help pour afficher la liste des commandes.`)
            );
            return;
        }

        const embed = client.newEmbed("info", message.author, client.prefix + cmd.name.toLowerCase())
            .addField("Nom: ", cmd.name)
            .addField("Description", cmd.description);
        if(cmd.aliases)
            embed.addField("Alias", cmd.aliases.join(", "));
        message.channel.send(embed);
    }
}