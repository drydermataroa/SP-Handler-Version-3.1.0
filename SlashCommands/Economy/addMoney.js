const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "addmoney",
    description: "💰 | Add money to a user",
    category: "Economy",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "user",
            description: "Mention a user which you want to give money to",
            type: "USER",
            required: true,
        },
        {
            name: "amount",
            description: "Give amount",
            type: "NUMBER",
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const { guild, options, member, user } = interaction;

        let target = options.getUser("user") || member
        let amount = options.getNumber("amount") || 1
        eco.balance.add(amount, target.id, guild.id)

        const embed = new MessageEmbed()
        .setTitle(` ${emojis.coin} **Succesfully Added** ${emojis.coin}`)
        .setDescription(`You have succesfully deposit into **${target}** account.`)
        .addFields(
            { name: '**Banked To:**', value: `${target}`, inline: true },
            { name: '**Amount:**', value: `**${amount}**`, inline: true },
            )
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

        interaction.followUp({embeds: [embed]})
    }
}