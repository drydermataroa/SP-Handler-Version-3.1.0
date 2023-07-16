const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "weekly",
    description: "🎁 | Claim weekly rewards",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    run: async (client, interaction, args) => {
        const { member, guild } = interaction;

        let weekly = eco.rewards.weekly(member.id, guild.id);
        if(!weekly.status){
            const claimedEmbed = new MessageEmbed()
            .setDescription(`You have already claimed your weekly reward! Time left until next claim: **${weekly.value.days}** days, **${weekly.value.hours}** hours, **${weekly.value.minutes}** minutes and **${weekly.value.seconds}** seconds.`)
            .setColor(ec.wrong)
            .setTimestamp()

            return interaction.followUp({embeds: [claimedEmbed]});
        }
        const receiveEmbed = new MessageEmbed()
        .setTitle(` ${emojis.coin} **Weekly Rewards** ${emojis.coin}`)
        .setDescription(`You have received **${weekly.reward}** weekly coins!`)
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