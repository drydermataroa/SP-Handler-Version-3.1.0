const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const em = require("../../settings/emojis")
const set = require("../../settings/settings")
const mal = require("mal-scraper");
const ec = require("../../settings/embed")

module.exports = {
 name: "anime",
 description: `💮 | Search for information about Anime by given name`,
 category: "Fun",
 options: [
  {
   name: "query",
   description: "Anime name",
   required: true,
   type: 3,
  },
 ],
 run: async (client, interaction, args) => {
   const search = args.join(" ");
   mal
    .getInfoFromName(search)
    .then((data) => {
     const embed = new MessageEmbed()
      .setAuthor({ name: `${em.search_glass} My Anime List search result for ${args}` })
      .setImage(data.picture)
      .setColor(ec.color)
      .addFields(
        { name: `${em.flag_gb} English Title`, value: `\`\`\`${data.englishTitle || "None!"}\`\`\`` },
        { name: `${em.flag_jp} Japanese Title`, value: `\`\`\`${data.japaneseTitle || "None!"}\`\`\`` },
        { name: `${em.book} Type`, value: `\`\`\`${data.type || "N/A!"}\`\`\``, inline: true },
        { name: `${em.counting} Episodes`, value: `\`\`\`${data.episodes || "N/A!"} episodes\`\`\``, inline: true },
        { name: `${em.star} Score`, value: `\`\`\`${data.score || "N/A!"}\`\`\``, inline: true },
        { name: `${em.star2} Rating`, value: `\`\`\`${data.rating || "N/A!"}\`\`\`` },
        { name: `${em.calendar_spillar} Aired`, value: `\`\`\`${data.aired || "N/A!"}\`\`\`` },
        { name: `${em.barchart} Scored by`, value: `\`\`\`${data.scoreStats || "N/A!"}\`\`\`` }
      )
      .setFooter({
       text: `Requested by ${interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      })
      .setTimestamp();
     const row = new MessageActionRow()
      .addComponents(
       new MessageButton()
        .setStyle("LINK")
        .setURL(data.url)
        .setLabel("View more")
      );
     interaction.followUp({ embeds: [embed], components: [row] });
    })
          }
}