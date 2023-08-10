const { MessageEmbed , MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'suggest',
    description: '📊 | Suggest command usage and information!',
    options: [
        {
            name: 'channel',
            description: 'Input suggestion channel',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'details',
            description: 'Input suggestion details',
            type: 'STRING',
            required: true,
        },
    ],
       
	run: async(client, interaction, args) => {
        const channel = interaction.options.getChannel('channel');
        const query = interaction.options.getString('details');

        if(channel && query){

        const embed = new MessageEmbed()
        .setTitle('New Suggestion!')
        .addFields(
            { name: '**Author:**', value: `${interaction.user.username}`, inline: true },
            { name: '**Guild:**', value: interaction.guild.name, inline: true },
            { name: '**Suggestion:**', value: query }
            )
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
        .setTimestamp()

        let msgEmbed = await channel.send({embeds: [embed]});
        await msgEmbed.react('👍')

        await interaction.followUp("**Suggestion has been sent!**")
        } else {
            await interaction.followUp("Incorrect usage");
        }
	},  
};