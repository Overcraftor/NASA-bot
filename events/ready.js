module.exports = client =>{
    console.log("Bot connected !")
    client.user.setActivity("By Overcraftor#4841 | Fais " + client.config.prefix + "help").then();
}