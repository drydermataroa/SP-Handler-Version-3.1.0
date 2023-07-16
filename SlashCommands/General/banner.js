const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../settings/config.json");
const ec = require("../../settings/embed");
const axios = require("axios")

module.exports = {
  name: "banner",
  description: "🛢️ | Get the banner of the specified member",
  options: [
    {
      name: "member",
      description: "Input member to get banner",
      type: "USER",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const { user } = interaction.options.get("member");

    axios.get(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${config.token}`
      },
    })
    .then((res) => {
      const { banner, accent_color } = res.data;

      if (banner) {
        const extension = banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

        const embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Banner`)
        .setImage(url)
        .setColor(ec.color)
        .setFooter({
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp()
        
        interaction.followUp({ embeds: [embed] })
      } else {
        if (ec.red) {
          const embed = new MessageEmbed()
          .setDescription(`**${user.tag}** does not have a banner but they have an accent color`)
          .setColor(ec.red)

          interaction.followUp({ embeds: [embed] })
        } else {
          interaction.followUp({ content: `**${user}** does not have a banner nor do they have an accent color.`})
        }
      }
    });
  },
};
