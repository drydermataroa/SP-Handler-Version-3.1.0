const rgx = /^(?:<@!?)?(\d+)>?$/;
const { MessageEmbed } = require('discord.js');
const em = require('../../settings/emojis')
const ec = require("../../settings/embed")

module.exports = {
  name: 'leaveguild',
  description: '👋 | Make your bot leave a server without bring in their server.',
  ownerOnly: true,
  options: [
    {
      name: 'serverid',
      description: 'Add guild id to kick bot out of current server',
      type: 'STRING',
      required: true,
    },
  ],

  run: async(client, interaction, args) => {
    const id = interaction.options.getString('serverid')
    const guildId = args[0];
    if (!rgx.test(guildId))
      return interaction.followUp({ content: 'Proivide a guild'})

    const guild = interaction.client.guilds.cache.get(guildId);
    if (!guildId) return interaction.followUp({ content: 'invalid guild id'});
    await guild.leave();

    const embed = new MessageEmbed()
    .setTitle(`${em.wave} Leaving Server ${em.wave}`)
    .setDescription(`I have successfully left **${guild.name}**`)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    .setTimestamp()
    .setColor(ec.color)

    interaction.followUp({ embeds: [embed]})
  }
}