const { MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed")
const set = require("../../settings/settings")

module.exports = {
  name: "report",
  description: "🔨 | Report errors on bots or commands!",
  options: [
    {
      name: "bug",
      description: "Give error messages to bots or commands",
      type: "STRING",
      required: true
    }
  ],
  run: async(client, interaction) => {
    const report = interaction.options.getString("bug");
    const channel = client.channels.cache.get(set.modLogs);

    const bug = new MessageEmbed()
      .setTitle("New Report Bug")
      .addFields(
        { name: "User Name", value: `**${interaction.user.username}#${interaction.user.discriminator}**`},
        { name: "ID User", value: interaction.user.id },
        { name: "Reported", value: report },
        { name: "Server Name", value: `**${interaction.guild.name}**` },
        { name: "ID Server", value: `**${interaction.guild.id}**` },
      )
       .setColor(ec.color)

    channel.send({ embeds: [bug] })
    //channel.send('content');

    interaction.followUp({
      content: "Thank you for sending bugs, we will fix it as soon as possible",
      ephemeral: true
    });
  }
};