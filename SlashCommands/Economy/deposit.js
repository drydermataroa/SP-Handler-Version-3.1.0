const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed');
const emojis = require('../../settings/emojis');

module.exports = {
    name: "deposit",
    description: "🤑 | Withdraw money from your bank",
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
        let balance = eco.balance.fetch(member.id, guild.id)

        if(!amount) return interaction.followUp('Specify an amount.')
        if(isNaN(amount)) return interaction.followUp('Amount must be a number.')
        if(amount > balance) return interaction.followUp(`You don't have enough money on your balance to deposit **${amount}** coins.`)

        eco.balance.subtract(amount, member.id, guild.id)
        eco.bank.add(amount, member.id, guild.id)

        const embed = new MessageEmbed()
        .setTitle(`${emojis.money} **Deposit Coins** ${emojis.money}`)
        .setDescription(`Successfully deposited **${amount}** coins to your bank!`)
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