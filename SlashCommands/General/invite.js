const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ec = require('../../settings/embed')

module.exports = {
    name: "invite",
    description: "⚙️ | Gets the bot's invite link",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);

      const emb = new MessageEmbed()
      .setColor(ec.color)
      .setTitle(`Invite ${client.user.username}`)
      .setDescription(`Invite the bot!`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
				.setLabel('Instant')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb], components: [row] });
      }, 500);
    },
};