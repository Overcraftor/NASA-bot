module.exports = {
    name: "satelliteImage",
    category: "N.A.S.A.",
    aliases: ["satimage", "satimg"],
    description: "Permet d'obtenir une photo satellite selon des coordonnées précises.",
    usage: "satelliteImage <latitude> <longitude> [dimensions (default: 0.15)]",
    deleteMessage: false,
    isMp: false,

    execute(message, args, client) {
        if(args.length < 2){
            return message.channel.send(
                client.newEmbed("error", message.author, "Veuillez indiquer une latitude et une longitude !", "Vous pouvez récupérer la longitude et la latitude d'un lieu via google maps"
            ));
        }

        message.reply("Recherche de l'image via l'API de la NASA...").then(msg =>{
            const url = client.nasa.getSatellitURL(args[0], args[1], args[2] || "0.15");
            console.log(url);

            client.nasa.getImageFromURL(url, msg);
        });
    }
}
