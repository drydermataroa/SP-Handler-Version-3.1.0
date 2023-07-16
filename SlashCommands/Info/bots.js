const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const ec = require('../../settings/embed');

module.exports = {
    name: 'bots',
    description: '🤖 | See all bots in the server 🤖',
    category: 'Info',
    aliases: ['bt'],
    userPermissions: [],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        let members = interaction.guild.members.cache.filter(u => u.user.bot).map((u) => `${u.user.tag} (\`${u.id}\`)`)
        const total_members = members.length
        members = total_members > 20 ? members.slice(0, 20).join("\n") : members.join("\n")
        if(members.length <= 0) {
            members = "No Bots"
        }

        const embed = new MessageEmbed()
        .setAuthor({ name:`Bots found!`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`There is a total of **${total_members}** bots in **${interaction.guild.name}**`)
        .addFields(
          { name: "__**Discord Bots**__", value: `${total_members > 20 ? `${members} and ${total_members - 20} more.` : members}` }
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

        interaction.followUp({embeds: [embed]})
    }
}