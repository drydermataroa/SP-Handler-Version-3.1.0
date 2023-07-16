const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed")
const moment = require("moment");
const statuses = {
  online: "🟢 Online",
  offline: "🔘 Offline",
  dnd: "🔴 DND",
  idle: "🟡 Idle",
};

module.exports = {
  name: "userinfo",
  description: "🔷 | Shows info about user.",
  options: [
    {
      name: "user",
      description: "Mention the user you want to get info about",
      type: "USER",
      required: "true",
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.options.getMember("user");
    await member.fetch();

    const guild = interaction.guild;

    let status = member.presence?.status;

    if (status === "dnd" || status === "idle" || status === "online")
      status = statuses[status];
    else if (
      status === "invisible" ||
      status === "offline" ||
      status === undefined
    )
      status = statuses["offline"];

    const replyEmbed = new MessageEmbed()
      .setTitle(`**${guild.name} User Information**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(ec.color)
      .setDescription(`**User:**\n${member.user.username}`)
      .addFields(
        { name: 'Status:', value: `${status}` },
        { name: 'Name:', value: `\`\`\`${member.user.username}\`\`\`` },
        { name: 'ID:', value: `\`\`\`${member.id}\`\`\`` },
        { name: 'Discriminator:', value: `\`\`\`${member.user.discriminator}\`\`\``, inline: true },
        { name: 'Nickname:', value: `\`\`\`${member.user.nickname || "False"}\`\`\``, inline: true },
        { name: 'Bot Account:', value: `\`\`\`${member.bot ? "True" : "False"}\`\`\``, inline: true },
        { name: 'Joined Server On:', value: `\`\`\`${moment(member.joinedAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true },
        { name: "Created On:", value: `\`\`\`${moment(member.user.createdAt).format('dddd Do MMM YYYY')}\`\`\``, inline: true },
      )
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 

                                                              
    interaction.followUp({ embeds: [replyEmbed] });
  },
};