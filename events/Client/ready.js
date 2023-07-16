const client = require("../../index");
const set = require("../../settings/settings.js");
const chalk = require('chalk')
console.clear()

client.on("ready", () => {
    console.log(chalk.greenBright(`
╔═════════════════════════════════════════════╗
║                                             ║
║        YOUR BOT IS NOW ONLINE.......        ║
║                                             ║
╚═════════════════════════════════════════════╝`
    ))
});


client.on('ready', async () => {
    let membersCount = client.guilds.cache
    .map((guild) => guild.memberCount)
    .reduce((a, b) => a + b, 0);
  
    const activites = [
        {name: `${client.guilds.cache.size} Global Servers`, type: "WATCHING"},
        {name: ` ${membersCount} Global users!`, type: "WATCHING"},
        {name: `Handler Version: ${set.handlerVersion}`, type: "PLAYING"},
        {name: `All Servers`, type: "PLAYING"},
    ]
    let activity = 0
    client.user.setPresence({status: "DND", activity: activites[0]})
    setInterval(() => {
        if(activity === activity.length) return activity = 0;
        activity++
        client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
    }, 100 * 100);
});