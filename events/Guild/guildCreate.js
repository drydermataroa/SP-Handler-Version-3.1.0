const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");
const set = require("../../settings/settings");

    ////////////////////////////////////////////
    //SOMEONE INVITED YOUR BOT IN THEIR SERVER//
    ////////////////////////////////////////////

client.on("guildCreate", async guild => {
    let theowner = "NO OWNER DATA! ID: ";
    await guild.fetchOwner().then(({ user }) => { theowner = user; }).catch(() => {})
    let embed = new MessageEmbed()
      .setColor(ec.color)
      .setTitle(`__**Joined a New Server**__`)
      .setDescription(`${guild.name} has invited your bot into their server`)
      .addFields(
        { name: "**Guild Info:**", value: `\`\`\`${guild.name} (${guild.id})\`\`\``},
        { name: "**Owner Info:**", value: `\`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``},
        { name: "**Member Count:**", value: `\`\`\`${guild.memberCount}\`\`\``},
        { name: "**Servers Count:**", value: `\`\`\`${client.guilds.cache.size}\`\`\``},
      )
      .setThumbnail(guild.iconURL({dynamic: true}))
      .setFooter({ text: ec.footer, iconURL: ec.iconURL })
      .setTimestamp()
    const botLogs = client.channels.cache.get(set.botLogs) || await client.channels.fetch(botLogs).catch(()=>{}) || false 
    if(set.botLogs) botLogs.send({embeds: [embed]}).catch(console.warn)
  });