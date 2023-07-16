const { MessageEmbed } = require('discord.js');
const em = require("../../settings/emojis")
const roast = require("../../structures/Json/roast.json")

module.exports = {
  name: "roast",
  description: '🤣 | Roast another user in the server.',
  options: [
    {
      name: "user",
      description: "Select a user name",
      type: "USER",
      required: true
    },
  ],

  run: async(client, interaction, args) => {

    const user = interaction.options.getUser("user")

    const loadingEmbed = new MessageEmbed()
    .setTitle(`${em.loading} **Please wait...**`)
    .setDescription('**Getting Ready To Roast Your Target**.')
    .setColor("BLURPLE")
    
    const led = new MessageEmbed()
    .setTitle(`${em.success} ${interaction.user.username} Just Roasted ${user.username}`)
    .setDescription(`> **Hey ${user}** ${roast[Math.floor(Math.random() * roast.length)]}`)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setColor("BLURPLE")
    .setTimestamp()

    interaction.followUp({ embeds: [loadingEmbed] }).then((interaction) => {
      setTimeout(function () {
        interaction.edit({ embeds: [led]});
      }, 5000)
    })
  }
}