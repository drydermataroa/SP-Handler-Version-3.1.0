const { MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed")

module.exports = {
    name: "bannedmembers",
    description: "Gets a list of banned members",
    type: "Text",
    emoji: "⚒️",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    
     run: async(client, message, args) => {
        const fetchBans = message.guild.bans.fetch();
        if (!fetchBans) {
            const NoBannedUsersEmbed = new MessageEmbed()
            .setColor(ec.error)
            .setDescription('This server does not have any banned members.')
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                return message.channel.send(NoBannedUsersEmbed);
        } else {

            const bannedMembers = (await fetchBans)

            .map((member) => `\`\`\`ini\n [ User: ${member.user.tag}  Reason: ${member.reason} ]\`\`\``)
            .join("\n\n")
           

            const embed = new MessageEmbed()
            .setTitle(`Banned users in ${message.guild.name}`)
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(bannedMembers)
            .setColor(ec.color)
            .setFooter({text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })


            message.channel.send({ embeds: [embed]})
        }
     }
}