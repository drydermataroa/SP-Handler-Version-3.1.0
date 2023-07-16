const client = require('../../index')
const { MessageEmbed, MessageActionRow, MessageButton, } = require('discord.js');
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

client.on("interactionCreate", async (interaction) => {
    if (interaction.customId === 'tic') { interaction.deferUpdate();
        
    const id = Math.floor(Math.random() * 1000000000)
    const channel = await interaction.guild.channels.create(`ticket-${id}`, { 
        type: 'text',
        permissionOverwrites: [{
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL'],
        },],
    });
    channel.permissionOverwrites.edit(interaction.member, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
    });
    
    const embed = new MessageEmbed()
    .setTitle(`${emojis.tick} **Ticket Opened!** ${emojis.tick}`)
    .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
    .addFields({ name: `Opened by:`, value: `${interaction.user.tag}` })
    .setColor(ec.color)
    .setTimestamp()
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })});
    
    const del = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('del')
        .setLabel('Delete Ticket!')
        .setStyle('DANGER'),
        );
        
        channel.send({
            content: `Welcome <@${interaction.user.id}>`,
            embeds: [embed],
            components: [del]
        }).then(interaction.followUp({
            content: 'Created Ticket!',
            ephemeral: true
        }))
} else if (interaction.customId === 'del') {
interaction.deferUpdate();
            const channel2 = interaction.channel
            channel2.delete();
        }
})