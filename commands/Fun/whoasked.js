const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "whoasked",
    description: "test command. Something random",
    emoji: "🎲",

    run: async(client, message, args) => {
        const member = message.mentions.members.first();
        let firstEmbed
        if(member){
            firstEmbed = new MessageEmbed()
            .setDescription(`**${member.displayName}**, Bot is searching for who asked!
            Now playing: 
            Who Asked (Feat. Nobody Did)
            ──────────────⚪
            ◄◄⠀▐▐⠀►► 3:56 / 𝟹:𝟻𝟼⠀───○ 🔊`);
            message.channel.send({embeds: [firstEmbed]})
        }else{
            firstEmbed = new MessageEmbed()
            .setDescription(`Now playing: 
            Who Asked (Feat. Nobody Did)
            ──────────────⚪
            ◄◄⠀▐▐⠀►► 3:56 / 𝟹:𝟻𝟼⠀───○ 🔊`);
            message.channel.send({embeds: [firstEmbed]})
        }
    }
}