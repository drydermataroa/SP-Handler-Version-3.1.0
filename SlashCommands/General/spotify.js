const { MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "spotify",
    description: "🎧 | Display your / mentioned user's spotify status",
    options: [
        {
          type: 'USER',
          description: 'The user',
          name: 'user',
          required: false,
        },
      ],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let user = 
        interaction.guild.members.cache.get(args[0]) || interaction.member;

        const activities = user.presence.activities;

        const array = [];

        for (let i = 0; i < activities.length; i++) {
            if (activities[i].name === 'Spotify') {
                array.push(activities[i].syncID);

                const data = user.presence.activities[i];

                let trackAuthor = data.state;
                trackAuthor = trackAuthor.replace(/;/g, ",");

                const embed = new MessageEmbed()
                    .setAuthor({ name: 'Spotify Track Info', iconURL: 'https://cdn.discordapp.com/emojis/889955546810183731.png'})
                    .setColor("#2e3137")
                    .setThumbnail(`https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`)
                    .addFields(
                        { name: '➟ Song Name | ', value: `\`\`\`yaml\n${data.details} - ${data.state}\n\`\`\``, inline: true },
                        { name: '➟ Album | ', value: `\`\`\`yaml\n${data.assets.largeText}\n\`\`\``, inline: true },
                        { name: '➟ Author | ', value: `\`\`\`yaml\n${trackAuthor}\n\`\`\``, inline: true },
                        )
                    .setTimestamp()

                    interaction.followUp({ embeds: [embed] });
            }
        }
        if (array.length === 0) return interaction.followUp({ content: 'This member is not listening to Spotify', ephemeral: true });
    }
}