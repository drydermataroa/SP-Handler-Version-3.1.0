const { MessageEmbed } = require("discord.js");
const set = require("../../settings/settings")
const client = require("../../index.js");

client.on("guildMemberUpdate", async(oldMember, newMember) => {
  const oldStatus = oldMember.premiumSince
  const newStatus = newMember.premiumSince
    
  if(!oldStatus && newStatus) {
        client.channels.cache
            .get(set.boosters)
            .send({ embeds: [
              new MessageEmbed()
              .setAuthor({ name: oldMember.guild.name})
              .setTitle("__**New Booster!**__")
              .setImage(set.serverBoostGif)  
              .setDescription(`${newMember.user.tag} has boosted the server!`)
              .setFooter({ text: "Thank you for boosting!"})
              .setColor("f47fff")
              .setTimestamp()
            ]})
    }
  
  if(oldStatus && !newStatus) {
    client.channels.cache
      .get(set.boosters)
      .send({ embeds: [
        new MessageEmbed()
        .setAuthor({ name: oldMember.guild.name})
        .setTitle("__**Unboost!**__")
        .setDescription(`${newMember.user.tag} has unboosted the server!`)
        .setFooter({ text: "Thank you for boosting all this while!" })
        .setColor("#ff0000")
        .setTimestamp()
      ]})
  }
})