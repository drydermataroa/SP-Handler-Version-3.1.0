const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed")

module.exports = {
  name: "basedcalculator",
  description:
    "💢 | Calculates your basedness, sexy, cringeness",
  type: "CHAT_INPUT",
  options: [
    {
      name: "type",
      description: "The thing you want to calculate",
      type: "STRING",
      required: "true",
      choices: [
        {
          name: "Sexy",
          value: "SEXY",
        },
        {
          name: "Ugly",
          value: "UGLY",
        },
        {
          name: "Gay",
          value: "GAY",
        },
        {
          name: "Cringe",
          value: "CRINGE",
        },
        {
          name: "Gamer",
          value: "GAMER",
        },
      ],
    },
    {
      name: "user",
      description: "Select a user",
      type: "USER",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const type = interaction.options.getString("type");
    const input = interaction.options.getUser("user");
    const target = input || interaction.user.username;
    const rng = Math.floor(Math.random() * 101);
    
    if (Number(rng) > 1) all = "(1/10) ▰▱▱▱▱▱▱▱▱▱";
    if (Number(rng) > 9) all = "(1/10) ▰▱▱▱▱▱▱▱▱▱";
    if (Number(rng) > 19) all = "(2/10) ▰▰▱▱▱▱▱▱▱▱";
    if (Number(rng) > 29) all = "(3/10) ▰▰▰▱▱▱▱▱▱▱";
    if (Number(rng) > 39) all = "(4/10) ▰▰▰▰▱▱▱▱▱▱";
    if (Number(rng) > 49) all = "(5/10) ▰▰▰▰▰▱▱▱▱▱";
    if (Number(rng) > 59) all = "(6/10) ▰▰▰▰▰▰▱▱▱▱";
    if (Number(rng) > 69) all = "(7/10) ▰▰▰▰▰▰▰▱▱▱";
    if (Number(rng) > 79) all = "(8/10) ▰▰▰▰▰▰▰▰▱▱";
    if (Number(rng) > 89) all = "(9/10) ▰▰▰▰▰▰▰▰▰▱";
    if (Number(rng) > 99) all = "(10/10) ▰▰▰▰▰▰▰▰▰▰";

    const replyEmbed = new MessageEmbed()
      .setTitle(`Calculate Your Truth`)
      .setDescription(`${target} is ${rng}% **${type}**\n\n ${all}`)
      .setColor(ec.color)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })

    interaction.followUp({ embeds: [replyEmbed] });
  },
};