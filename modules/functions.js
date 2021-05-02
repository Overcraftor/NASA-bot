const Discord = require("discord.js");
const https = require("https");
const fs = require("fs");
const Stream = require("stream").Transform;
// const mysql = require("mysql");

module.exports = client =>{

    /**
     *
     * @param{"error"|"failure"|"success"|"pending"|"info"} type
     * @param author
     * @param title
     * @param description
     * @param thumbnail
     * @returns {module:"discord.js".MessageEmbed}
     */
    client.newEmbed = (type, author, title, description, thumbnail) =>{
        let embedColor =
            type === "error" || type === "failure" ? "#FF0000" :
                type === "success" ? "#00ff00" :
                    type === "pending" ? "#676767" :
                        "#00ffff"; //infos

        let titleType =
            type === "error" ? "**Erreur:** " :
                type === "failure" ? "**Échec:** ":
                    type === "pending" ? "**En cours:** " :
                        type === "success" ? "**Succès:** " :
                            "**Infos:** ";

        const embed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp();

        if(title) embed.setTitle(titleType + title);
        if(description) embed.setDescription(description);
        if(thumbnail) embed.setThumbnail(thumbnail);
        if(author) embed.setAuthor(author.username, author.avatarURL());

        return embed;
    }

    client.getCommand = (cmdName) => {
        return client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    }

    client.getImageFromURL = (url) => {
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
                console.log("This is not a valid image");
            }
        }).on('error', err =>{
            console.log("Error: " + err.message);
        });
    }

    /*client.initDataConnection = () =>{
        const connection = client.connectToMYSQL();
        connection.query("CREATE TABLE IF NOT EXISTS pronoteUsers(" +
            "url VARCHAR(255) NOT NULL," +
            "username VARCHAR(255) NOT NULL)", function (error){
            if(error){
                console.error("Impossible de se connecter à mysql !");
            }else{
                console.log("Création de la table pronoteUsers !");
                connection.destroy();
            }
        });
    }

    client.connectToMYSQL = () =>{
        const connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        connection.connect();
        return connection;
    }*/
}