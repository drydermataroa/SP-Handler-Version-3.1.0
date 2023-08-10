const { MessageEmbed } = require("discord.js");
const ec = require('../../settings/embed')

module.exports = {
    name: "bot-avatar",
    description: "🤖 | Change the avatar of the bot.",
    ownerOnly: true,
    type: 1,
    options: [
        {
            type: 11,
            name: "image",
            description: "Attach image."
        },
        {
            type: 3,
            name: "url-image",
            description: "Image URL."
        }
    ],

    run: async (client, interaction, args) => {

        const avatarAttch = interaction.options.get("image")?.attachment?.attachment;
        const avatarUrl = interaction.options.get("url-image")?.value;

        let avatar = avatarAttch ? avatarAttch : avatarUrl;

        await client.user.setAvatar(avatar);

        const embed = new MessageEmbed()
            .setTitle(`✅  Avatar changed successfully.`)
            .setImage(avatar)
            .setColor(ec.color)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
            .setTimestamp()

        interaction.followUp({ embeds: [embed], ephemeral: true });
    }
};