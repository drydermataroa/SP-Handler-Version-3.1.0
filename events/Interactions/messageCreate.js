const client = require("../../index");
const { MessageEmbed, Permissions } = require("discord.js");
const ec = require("../../settings/embed")
const { prefix } = require("../../settings/config.json");

client.on("messageCreate", async (message) => {
  const { escapeRegex, onCoolDown } = require("../../structures/Functions/function");
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if(command.userPerms) {
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
          const userPerms = new MessageEmbed()
          .setTitle('**Permission Needed**')
          .setColor(ec.wrong)
          .setDescription(`🚫 ${message.author}, You don't have permissions to use this command!`)
          return message.reply({ embeds: [userPerms] })
      }
  }

  ////////////////////////////////
  ///////COOLDOWN HANDLER////////
  ///////////////////////////////
    if (onCoolDown(message, command)) {
      let cool = new MessageEmbed()
      .setColor(ec.red)
      .setTitle('Your On Cooldown')
      .setDescription(`> ❌ Please wait ${onCoolDown(message, command)} more Second(s) before reusing the ${command.name} command.`)
      return message.channel.send({embeds : [cool]})
    }
    await command.run(client, message, args);
});