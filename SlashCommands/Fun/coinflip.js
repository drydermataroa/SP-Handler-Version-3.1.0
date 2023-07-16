const { MessageEmbed } = require("discord.js");
const answers = ["heads", "tails"];

module.exports = {
  name: "coinflip",
  description: "💰 | Play a game of Heads or tails?",
  userPermission: "VIEW_CHANNEL",
  options: [
    {
      name: "choice",
      required: true,
      description: "heads or tails?",
      type: "STRING",
      choices: [
        { name: "Heads", value: "heads" },
        { name: "Tails", value: "tails" },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    const choices = interaction.options.getString("choice");

    const headswinembed = new MessageEmbed()
      .setTitle("Its a heads!!")
      .setDescription(`The coin landed on heads , You won the bet`)
      .setColor("GREEN");

    const tailslooseembed = new MessageEmbed()
      .setTitle("Its a tails!!")
      .setDescription(
        `The coin landed on tails but you chose heads , You lost the bet`)
      .setColor("RED");

    const tailswinembed = new MessageEmbed()
      .setTitle("Its a tails!!")
      .setDescription(`The coin landed on tails , You won the bet`)
      .setColor("GREEN");

    const headslooseembed = new MessageEmbed()
      .setTitle("Its a heads!!")
      .setDescription(
        `The coin landed on heads but you chose tails , You lost the bet`)
      .setColor("RED");

    const coin = answers[Math.floor(Math.random() * answers.length)];
    if (choices === "heads") {
      if (coin === "heads") {
        interaction.followUp({ embeds: [headswinembed] });
      } else if (coin === "tails") {
        interaction.followUp({ embeds: [tailslooseembed] });
      }
    }

    if (choices === "tails") {
      if (coin === "tails") {
        interaction.followUp({ embeds: [tailswinembed] });
      } else if (coin === "heads") {
        interaction.followUp({ embeds: [headslooseembed] });
      }
    }
  },
};