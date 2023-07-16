const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: 'cleverate',
    description: '❤️ | Rate a user on how clever are they.',
    category: 'Fun',
    aliases: ['cr'],
    userPermissions: [],
    type: 'CHAT_INPUT',
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'The user',
            name: 'user',
            required: false,
        },
    ],

    run: async (client, interaction, args) => {

        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let rng = Math.floor(Math.random() * 101);

        const cleverembed = new MessageEmbed()
            .setTitle("__**CLEVER Rate**__ 💡")
            .setDescription(`**__${member.user.username}#${member.user.discriminator}__** ===> ` + rng + "% Clever!!`**")
            .setColor(ec.color)
            .setThumbnail('https://www.poetry4kids.com/wp-content/uploads/2008/05/im-clever-whenever.png')
            .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 
            .setTimestamp()

        interaction.followUp({ embeds: [cleverembed] });
    }
}