const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "daily",
    description: "💰 | Claim daily rewards",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    run: async (client, interaction, args) => {
        const { member, guild } = interaction;

        let daily = eco.rewards.daily(member.id, guild.id);
        if(!daily.status){
            const claimedEmbed = new MessageEmbed()
            .setDescription(`You have already claimed your daily reward! Time left until next claim: **${daily.value.days}** days, **${daily.value.hours}** hours, **${daily.value.minutes}** minutes and **${daily.value.seconds}** seconds.`)
            .setColor(ec.wrong)
            .setTimestamp()

            return interaction.followUp({embeds: [claimedEmbed]});
        }
        const receiveEmbed = new MessageEmbed()
        .setTitle(`${emojis.coin} **Daily Rewards** ${emojis.coin}`)
        .setDescription(`You have received **${daily.reward}** daily coins!`)
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