module.exports = {
    name: "satelliteImage",
    category: "N.A.S.A.",
    aliases: ["aide", "?"],
    description: "Permet d'obtenir une photo satellite selon des coordonnées précises.",
    usage: "satelliteImage <latitude> <longitude> [dimensions (default: 0.15)]",
    deleteMessage: true,
    isMp: false,

    execute(message, args, client) {
        if(args.length < 2){
            return message.channel.send(
                client.newEmbed("error", message.author, "Veuillez indiquer une latitude et une longitude !", "Vous pouvez récupérer la longitude et la latitude d'un lieu via google maps"
            ));
        }

        message.reply("Recherche de l'image via l'API de la NASA...");
        const url = client.nasa.getSatellitURL(args[0], args[1], args[2] || "0.15");
        console.log(url);

        const img = client.nasa.getImageFromURL(url, message);
        if(img !== "err"){
            message.edit("Image trouvé.");
        }
    }
}