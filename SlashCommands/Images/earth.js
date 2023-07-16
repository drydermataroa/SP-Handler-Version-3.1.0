const { Client, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: 'earth',
    description: '🌏 | Flat planet earth image.',
    category: 'Images',
    userPermissions: [],
    type: "CHAT_INPUT",
    ownerOnly: false,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const embed = new MessageEmbed()
            .setTitle(`__**Flat Planet Earth**__`)
            .setColor(ec.color)
            .setDescription("If the earth isn't flat, explain this")
            .setImage("https://media1.tenor.com/images/462b6d76beee0f9501d20535dae9c00b/tenor..gif")
            .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 
            .setTimestamp()

    interaction.channel.send({ embeds: [embed]})
  }
}

