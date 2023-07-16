const { CommandInteraction, MessageEmbed } = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
    name: 'channelinfo',
    description: '❗ | see info about a channel',
    options: [
        {
            name: 'channel',
            description: 'select a channel',
            type: 'CHANNEL',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
        const { options, guild } = interaction;
        const channel = options.getChannel('channel')

        const embed = new MessageEmbed()
        .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL({dynamic: true})
        })
        .setColor(ec.color)
        .setDescription(`Info about ${channel} :`)
        .setFields(
            {
                name: 'Name',
                value: `\`${channel.name}\``,
                inline: true
            }, {
                name: 'Parent',
                value: `${channel.parentId ? `\`${channel.parent.name}\`` : "None"}`,
                inline: true
            },{
                name: 'Position',
                value: `\`${channel.position}\``,
                inline: true
            },{
                name: 'Nfsw',
                value: `\`${channel.nsfw}\``,
                inline: true
            }, {
                name: 'Type',
                value: `\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``,
                inline: true
            }, {
                name: 'Created At',
                value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`,
                inline: true
            }
        )

        return interaction.followUp({embeds: [embed]})
    }
}
