const discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
  name: "avatar",
  description: "Get a members avatar",
  emoji: "😎",

  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new discord.MessageEmbed()
      .setColor(ec.color)
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(`\`Click the button below to download!\``)
      .setFooter({ text: "Request by "+ message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})) .setLabel("PNG") .setEmoji("🧸") .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})) .setLabel("JPG") .setEmoji("🧸") .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"})) .setLabel("WEBP") .setEmoji("🧸") .setStyle("LINK"),
            new MessageButton() .setURL(user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif"})) .setLabel("GIF") .setEmoji("🧸") .setStyle("LINK")
        ])

message.channel.send({ embeds: [embed], components: [row]});
    
  },
};