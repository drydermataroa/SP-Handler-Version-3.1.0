const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "balance",
    description: "⏰ | Check user balance",
    userPermissions: ["SEND_MESSAGES"],
    category: "Economy",

    run: async (client, interaction, args) => {
        const {
            member,
            guild
        } = interaction;

        let balance = eco.balance.fetch(member.id, guild.id)
        let bank = eco.bank.fetch(member.user.id, guild.id)

        if(!balance) balance = 0;
        if(!bank) bank = 0;

        const embed = new MessageEmbed()
        .setTitle(`${emojis.money} **${member.user.username}**'s balance ${emojis.money}`)
        .setDescription('Your total banked and wallet balance\n\n')
        .addFields(
            { name: '**Wallet:**', value: `\`\`\`${balance}\`\`\``, inline: true },
            { name: '**Banked:**', value: `\`\`\`${bank}\`\`\``, inline: true },
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