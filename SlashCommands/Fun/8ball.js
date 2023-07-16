const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");
const answers = require("../../structures/Json/8ball.json")

module.exports = {
    name: '8ball',
    description: '🎱 | Ask any questions and the bot will answer for you in text.',
    category: 'Fun',
    type: 'CHAT_INPUT',
    options: [
        {
            type: 'STRING',
            description: 'Your question',
            name: 'question',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let yq = args.join(' ')
        let q = args.join(' ')
        if (!q) return 
        else {
            const embed = new MessageEmbed()
                .setTitle(`${member.user.tag} Asked me`, member.user.avatarURL({ dynamic: true }))
                .setDescription(`**Question:** \n ${yq} \n**My Answer:** \n ${answers[Math.floor(Math.random() * answers.length)]}`)
                .setColor(ec.color)
                .setFooter({
                    text: `Requested by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                     dynamic: true,
                     format: "png",
                     size: 2048,
                    }),
                   })
                .setTimestamp()
          
            interaction.followUp({ embeds: [embed] });
        }
    }
}