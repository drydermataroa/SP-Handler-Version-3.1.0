const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "withdraw",
    description: "🧸 | ithdraw money from your bank",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",
    options: [
        {
            name: "amount",
            description: "Give amount",
            type: "NUMBER",
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const { guild, options, member } = interaction;

        let amount = options.getNumber("amount")
        let balance = eco.bank.fetch(member.id, guild.id)

        if(!amount) return interaction.followUp('Specify an amount.')
        if(isNaN(amount)) return interaction.followUp('Amount must be a number.')
        if(amount > balance) return interaction.followUp(`You don't have enough money in your bank to send **${amount}** coins on your balance.`)

        eco.balance.add(amount, member.id, guild.id)
        eco.bank.subtract(amount, member.id, guild.id)

        const embed = new MessageEmbed()
        .setTitle(`${emojis.money} **Money to Bank** ${emojis.money}`)
        .setDescription(`Successfully sent **${amount}** to your balance!`)
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