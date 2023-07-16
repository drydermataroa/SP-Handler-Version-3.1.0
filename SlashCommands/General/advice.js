const { MessageEmbed } = require("discord.js");
const em = require("../../settings/emojis")
const fetch = require("node-fetch");
const ec = require("../../settings/embed")

module.exports = {
 name: "advice",
 description: `👓 | Get a random helpful advice`,
 usage: "/advice",
 category: "Fun",
 run: async (client, interaction, args) => {
   const res = await fetch("https://api.adviceslip.com/advice"),
    { slip } = await res.json();
   const embed = new MessageEmbed()
    .setTitle(`${em.thinking} My advice`)
    .setDescription(`>>> **${slip.advice}**`)
    .setColor(ec.color)
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ ephemeral: true, embeds: [embed] });
 }
}