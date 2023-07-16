const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "work",
    description: "⚔️ | Get your work rewards",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    run: async (client, interaction, args) => {
        const { member, guild } = interaction;

        let work = eco.rewards.work(member.id, guild.id);
        if(!work.status){
            
            const claimedEmbed = new MessageEmbed()
            .setDescription(`You have already worked! Time left until next work: **${work.value.days}** days, **${work.value.hours}** hours, **${work.value.minutes}** minutes and **${work.value.seconds}** seconds.`)
            .setColor(ec.wrong)
            .setTimestamp()

            return interaction.followUp({embeds: [claimedEmbed]});
        }
        const receiveEmbed = new MessageEmbed()
        .setTitle(`${emojis.hammer} **PAY DAY** ${emojis.hammer}`)
        .setDescription(`You worked hard and earned **${work.pretty}** coins!`)
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

        interaction.followUp({embeds: [receiveEmbed]});       
    }
}