const { Client, Message, MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
    name: "serverbanner",
    description: "Get the server banner",
    category: "Information",
    emoji: "🏅",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const banner = message.guild.bannerURL({dynamic: true, size: 1024})

        if(!banner) {
            return message.reply({content: `This server does not have a server banner!`})
        }
        const embed = new MessageEmbed()
        .setDescription(`**[16px](${message.guild.bannerURL({dynamic: true, size: 16})})** • **[32px](${message.guild.bannerURL({dynamic: true, size: 32})})** • **[64px](${message.guild.bannerURL({dynamic: true, size: 64})})** • **[128px](${message.guild.bannerURL({dynamic: true, size: 128})})** • **[256px](${message.guild.bannerURL({dynamic: true, size: 256})})** • **[512px](${message.guild.bannerURL({dynamic: true, size: 512})})** • **[1024px](${message.guild.bannerURL({dynamic: true, size: 1024})})** • **[2048px](${message.guild.bannerURL({dynamic: true, size: 2048})})** • **[4096px](${message.guild.bannerURL({dynamic: true, size: 4096})})**`)
        .setImage(banner)
        .setFooter({ text: ` • Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })
        .setColor(ec.color)

        return message.reply({embeds: [embed]})
    }
}