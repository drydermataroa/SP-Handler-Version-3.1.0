const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: 'setup-ticket',
    description: '🥉 | Setup a ticket system in the server.',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'channel',
            description: 'Select a channel to setup ticket system.',
            type: 'CHANNEL',
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel('channel')

        const embed = new MessageEmbed()
        .setColor(ec.color)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setDescription(
            "> __**How to make a ticket**__\n" +
            "> Please click on the button that relates to your need\n" +
            "> Once the ticket is made you will be redirected to a channel.\n" +
            "> There you will be able to contact the support team or admins.\n"
            )
        .setTitle(`${emojis.location} **Support Ticket** ${emojis.location}`)
        .setTimestamp()

        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('📋 Create Ticket!')
                .setStyle('PRIMARY'),
            );

        channel.send({ embeds: [embed], components: [bt] })

        interaction.followUp(`The channel ${channel} has been set for ticket system...`)
    }
}