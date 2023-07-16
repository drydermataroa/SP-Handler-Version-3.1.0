const { CommandInteracion, Client, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");
const fetch = require("node-fetch");

module.exports = {
    name: 'covid',
    description: "☢️ | Gets information about covid gloablly and per country",
    category: 'info',
    userPermissions: [],
    type: 'CHAT_INPUT',
  options: [
    {
      name: "country",
      type: "STRING",
      description: "The country you want information about",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    let link;
        let embed = new MessageEmbed()

        if (!args[0] || args[0].match(/all|global|globe|world/gi)) {
            let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
            jsonData = await jsonData.json()

            embed
                .setTitle("Global Corona Virus Cases")
                .setColor(ec.color)
                .setThumbnail(`https://images-ext-1.discordapp.net/external/I1A-p5xztRVgGNUnxLp15eT7PkC2LYrxYdNKqjHyYqA/https/i.giphy.com/YPbrUhP9Ryhgi2psz3.gif?width=473&height=473`)
                .addFields(
                  { name: "**Total Cases:**", value: jsonData.cases.toLocaleString(), inline: true },
                  { name: "**Total Deaths:**", value: jsonData.deaths.toLocaleString(), inline: true },
                  { name: "**Total Recovered:**", value: jsonData.recovered.toLocaleString(), inline: true },
                  { name: "**Today's Cases:**", value: jsonData.todayCases.toLocaleString(), inline: true },
                  { name: "**Today's Deaths:**", value: jsonData.todayDeaths.toLocaleString(), inline: true },
                  { name: "**Active Cases:**", value: jsonData.active.toLocaleString(), inline: true },
                )
        } else {
            let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
            jsonData = await jsonData.json()

            if (!jsonData.country) return interaction.followUp({ content: "I am unable to get the details for **" + args[0] + "**."})

            embed.setTitle(`${jsonData.country.toUpperCase()}`)
                .setColor(ec.color)
                .setThumbnail(jsonData.countryInfo.flag || "")
                .addFields(
                  { name: "**Total Cases:**", value: jsonData.cases.toLocaleString(), inline: true },
                  { name: "**Total Deaths:**", value: jsonData.deaths.toLocaleString(), inline: true },
                  { name: "**Total Recovered:**", value: jsonData.recovered.toLocaleString(), inline: true },
                  { name: "**Today's Cases:**", value: jsonData.todayCases.toLocaleString(), inline: true },
                  { name: "**Today's Deaths:**", value: jsonData.todayDeaths.toLocaleString(), inline: true },
                  { name: "**Active Cases:**", value: jsonData.active.toLocaleString(), inline: true },
                )
        }

        return interaction.followUp({ embeds: [embed] }).catch(err => {
            console.log(err)
        })
  },
};
