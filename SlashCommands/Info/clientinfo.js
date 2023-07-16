const { MessageEmbed, CommandInteraction } = require("discord.js");
const moment = require("moment");
const { mem, cpu, os } = require("node-os-utils");
const { stripIndent } = require("common-tags");
const ec = require("../../settings/embed")
const config = require("../../settings/config.json")

module.exports = {
  name: "botinfo",
  description: "🤖 | Shows bot statistics.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction, args) => {
    const d = moment.duration(interaction.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const clientStats = stripIndent`
          Servers   :: ${interaction.client.guilds.cache.size}
          Users     :: ${interaction.client.users.cache.size}
          Channels  :: ${interaction.client.channels.cache.size}
          WS Ping   :: ${Math.round(interaction.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: ${config.prefix}
       `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;

    const replyEmbed = new MessageEmbed()
      .setTitle("Bot's Statistics")
      .addFields(
        { name: "Commands\n", value: `\`${interaction.client.commands.size}\` commands`, inline: true },
        { name: "Client", value: `\`\`\`asciidoc\n${clientStats}\`\`\`` },
        { name: "Server", value: `\`\`\`asciidoc\n${serverStats}\`\`\`` },
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor(ec.color);

    interaction.followUp({ embeds: [replyEmbed] });
  },
};