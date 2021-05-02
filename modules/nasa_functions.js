const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;

class nasa_functions {
    constructor(api_key) {
        this.api_key = api_key;
    }

    getImageFromURL = (url, message) => {
        https.get(url, res =>{
            message.edit("Réponse de l'api, traitement de l'image...").catch();
            if(res.statusCode === 200 && res.headers['content-type'] === "image/png"){
                let img = new Stream();

                res.on('data', chunk => {
                    img.push(chunk);
                });

                res.on('end', () =>{
                    return img;
                    /*let fileName = __dirname + "/test.jpg";
                    fs.writeFileSync(fileName, img.read());*/
                });
            }else{
                message.edit("Aucune image trouvé, veuillez indiquer des coordonnées valides !").catch();
            }
        }).on('error', err =>{
            console.log("Erreur lors de la récupération d'une image: " + err);
            message.edit("Error lors de la requêtes http, veuillez contacter un administrateur.").catch();
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