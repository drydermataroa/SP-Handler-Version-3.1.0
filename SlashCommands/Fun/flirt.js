const { MessageEmbed } = require('discord.js');
const flirt = require("../../structures/Json/flirt.json")
const em = require("../../settings/emojis")
const ec = require("../../settings/embed");

module.exports = {
  name: "flirt",
  description: '❤️ | Flirt with another user',
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

    const load = new MessageEmbed()
    .setTitle(`${em.loading} **Please wait...**`)
    .setDescription('Loading your random flirt message')
    .setColor(ec.color)
    
    const embed = new MessageEmbed()
    .setTitle(`${em.success} **Sucessfuly Loaded...**`)
    .setDescription(`> **Hey ${user}!** ${flirt[Math.floor(Math.random() * flirt.length)]}`)
    .setColor(ec.color)

    interaction.followUp({ embeds: [load] }).then((interaction) => {
      setTimeout(function () {
        interaction.edit({ embeds: [embed]});
      }, 5000)
    })
  }
}