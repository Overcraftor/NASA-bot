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
                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () =>{
                    message.edit("Image trouvé.").then();
                    //message.channel.send(new Discord.MessageAttachment(data)).then().catch(err => console.log("Error found: "+ err));
                    console.log(res.headers['content-type']);
                    //message.channel.send("Image satellite:", {file:data.hdurl});
                });
            }else{
                message.edit("Aucune image trouvé, veuillez indiquer des coordonnées valides !").then();
            }
        }).on('error', err =>{
            console.log("Erreur lors de la récupération d'une image: " + err);
            message.edit("Error lors de la requêtes http, veuillez contacter un administrateur.").then();
        });
        return "err";
    }

    getSatellitURL = (lat, long, dim) => {
        return `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${long}&dim=${dim}&api_key=3teH85nmdRdzB8472pqirtsjweuwP2j669B1bdhv`;
    }

    /*getSatellitURL = (lat, long, dim, date) => {
        return `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${long}&dim=${dim}&date=${date}&api_key=3teH85nmdRdzB8472pqirtsjweuwP2j669B1bdhv`;
    }*/
}

module.exports = client =>{
    client.nasa = new nasa_functions(process.env.api_key);
}
