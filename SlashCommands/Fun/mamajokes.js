const { MessageEmbed } = require('discord.js');
const em = require("../../settings/emojis")
const insults = require("../../structures/Json/insults.json")
const ec = require("../../settings/embed");

module.exports = {
  name: "mama-jokes",
  description: '🤣 | Receive a random "Your Mom" joke.',
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
    .setDescription('Loading the best **"You mom"** jokes!')
    .setColor(ec.color)
    
    const momEmbed = new MessageEmbed()
    .setTitle(`${em.success} **Sucessfuly Loaded...**`)
    .setDescription(`> **Hey ${user}!** ${insults[Math.floor(Math.random() * insults.length)]}`)
    .setColor(ec.color)

    interaction.followUp({ embeds: [loadingEmbed] }).then((interaction) => {
      setTimeout(function () {
        interaction.edit({ embeds: [momEmbed]});
      }, 5000)
    })
  }
}