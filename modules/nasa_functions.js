const https = require("https");
const Stream = require("stream").Transform;
const Discord = require("discord.js");

class nasa_functions {
    constructor(api_key) {
        this.api_key = api_key;
    }

    getImageFromURL = (url, message) => {
        https.get(url, res =>{
            if(res.statusCode === 200 && res.headers['content-type'] === "image/png"){
                message.edit("Réponse de l'api, traitement de l'image...").then();
                let data = new Stream();

                res.on('data', chunk => {
                    data.push(chunk);
                });

                res.on('end', () =>{
                    message.edit("Envoie de l'image...").then();
                    message.channel.send(new Discord.MessageAttachment(data.read(), 'nasabot.jpg')).then(() => message.delete()).catch(err => console.log("Error found: "+ err));
                });
            }else{
                message.edit("Aucune image trouvé, veuillez indiquer des coordonnées valides !").then();
                console.log("Erreur : " + res.err);
                console.log("Erreur : " + res);
                console.log("Erreur : " + res.err);
            }
        }).on('error', err =>{
            console.log("Erreur lors de la récupération d'une image: " + err);
            message.edit("Error lors de la requêtes http, veuillez contacter un administrateur.").then();
        });
        return "err";
    }

    getSatellitURL = (lat, long, dim) => {
        return `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${long}&dim=${dim}&api_key=${this.api_key}`;
    }
}

module.exports = client =>{
    client.nasa = new nasa_functions(process.env.api_key);
}
