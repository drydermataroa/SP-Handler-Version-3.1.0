const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");
const superagent = require('superagent');

module.exports = {
       name: 'bonk',
       description: '🔨 | Bonk user on head.',
       category: 'Images',
       userPermissions: [],
       type: "CHAT_INPUT",
       ownerOnly: false,
       options: [
        {
            name: "user",
            description: "User to get information from",
            type:"USER",
            required: true,
        }, 
    ],
    run: async (client, interaction, args) => {
      const member = interaction.guild.members.cache.get(args[0]) 
      if (member.id == interaction.member.id) return interaction.followUp('You cannot bonk yourself')
        const { body } = await superagent
          .get("https://api.waifu.pics/sfw/bonk");
          
          const embed = new MessageEmbed()
          .setColor(ec.color)
          .setDescription(`${member} Be bonked by ${interaction.user.tag}`)
          .setImage(body.url)
          .setFooter({ text: ec.footer, iconURL: ec.iconURL })
          .setTimestamp()
      if (
      member.id === client.user.id
    ) {
      return interaction.followUp(
        `${interaction.member}, Why me I'm not Horni!`
      );
    }
interaction.followUp( {embeds: [embed]});    
    }
}