const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;

class nasa_functions {
    constructor(api_key) {
        this.api_key = api_key;
    }

    getImageFromURL = (url) => {
        https.get(url, res =>{
            console.log(res.headers['content-type']);
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
                return "unvalid image";
            }
        }).on('error', err =>{
            return "unvalid http";
        });
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