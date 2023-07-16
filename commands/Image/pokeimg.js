const Discord = module.require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
  name: "pokeimg",
  description: "Get Image of the Mentioned Pokemon",
  emoji: "🧸",

  run: async (client, message, args) => {
    const name = args.join(" ");
    if (!name) {
      return message.channel.send("Please type the Pokemon Name");
    }
    const link = `https://i.some-random-api.ml/pokemon/${name}.png`;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${name}`)
      .setImage(link)
      .setColor(ec.color);

    message.channel.send({embeds: [embed]});
  },
};