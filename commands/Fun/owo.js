const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed")
const fetch = require("node-fetch");

module.exports = {
  name: "owo",
  category: "fun",
  emoji: "📕",
  run: async (client, message, args) => {
    const data = await fetch("https://rra.ram.moe/i/r?type=owo").then(res =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor(ec.color)
      .setDescription(`[Click here if the image failed to load.](https://cdn.ram.moe/${data.path.replace(
          "/i/",
          ""
        )})`
      )
      .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
};