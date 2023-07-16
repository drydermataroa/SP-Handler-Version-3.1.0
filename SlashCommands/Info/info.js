const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const ec = require("../../settings/embed");
const set = require("../../settings/settings");
const em = require("../../settings/emojis")
const si = require('systeminformation');
const moment = require("moment");
require("moment-duration-format");
const os = require('os')

module.exports = {
    name: 'info',
    description: '🔍 | Advance information for the current server',
    category: 'info',
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      
        const guild = interaction.guild;

       // Owner Variables
        const owner = await guild.fetchOwner();
        const serverOwner = client.users.cache.get(owner.id);

         // Members Variables
        const members = await guild.members.fetch()
        const humans = members.filter(member => !member.user.bot).size
        const bots = members.filter(member => member.user.bot).size

         // Emojis Variables
        const totalEmojis = await guild.emojis.cache.size;
        const normalEmojis = await guild.emojis.cache.filter((e) => !e.animated).size;
        const animatedEmojis = await guild.emojis.cache.filter((e) => e.animated).size;

        // Categories Variables
        const categories = await guild.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size;
        const textChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size;
        const voiceChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size;
        const newsChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_NEWS").size;
        const stageChannels = await guild.channels.cache.filter((channel) => channel.type === "GUILD_STAGE_VOICE").size;
        const totalChannels = categories + textChannels + voiceChannels + newsChannels + stageChannels;

         // Commands Variables
        const slashCommands = client.slashCommands.size
        const commands = client.commands.size

         // Booster Variables
        const boosts = guild.premiumSubscriptionCount

        const boostLevel = await guild.premiumTier ? guild.premiumTier : "0";
        const totalBoosts = await guild.premiumSubscriptionCount || "0";

        const boosters = members
        .filter( member => {
          return member.premiumSince !== null
        }).size
        const boosterNames = members
        .filter( member => {
          return member.premiumSince !== null
        }).map(member => member.user.tag)

    const info = new MessageEmbed()
    .setTitle(`**${guild.name} Server Information**`)
    .setColor(ec.color)
    .setThumbnail(ec.thumbnail)
    .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      }) 
    .setDescription(
      `> ${em.sparkles} __**GENERAL INFORMATION**__ ${em.sparkles} \n`+
      `> Here are the info of the current server. For more info please visit our support server or invite our bot below. Thank you.\n`+
      `> \n`+
      `> Join our support server for updates & support: [Support Server](${set.guildInvite})\n`+ 
      `> Invite our bot into your server [Invite Bot](${set.botInvite})\n`+
      `> \n`+
      `> ${em.lock} __**SERVICE INFORMATION**__ ${em.lock}\n`+
      `> <@${client.user.id}> runs on ${Object.keys(require("../../package").dependencies).length} [NPM packages](https://www.npmjs.com)\n`+
      `> **Libary Version:** ${require(`../../package.json`).version}\n`+
      `> \n`+
      `> ${em.location} __**SEVER INFORMATION**__ ${em.location}\n`+
      `> **Owner:** ${serverOwner}\n`+
      `> **Handler Version:** ${set.handlerVersion}\n`+
      `> **Region:** ${guild.region}\n`+
      `> **Partnered:** ${guild.partnered}\n`+
      `> **Verified:** ${guild.verified}\n`+
      `> **Total Members:** ${guild.memberCount}\n`+
      `> **Total Humans:** ${humans}\n`+
      `> **Total Bots:**" ${bots}\n`+
      `> **Total Servers:** ${client.guilds.cache.size}\n`+
      `> **Total Slash Commands:** ${slashCommands}\n`+
      `> **Total Prefix Commands:** ${commands}\n`+
      `> **Total Roles:** ${guild.roles.cache.size}\n`+
      `> **Total Channels:** ${totalChannels} **Text:** ${textChannels} **Voice:** ${voiceChannels} **Stage:** ${stageChannels}\n`+
      `> **Total Emojis:** ${guild.emojis.cache.size} **Normal Emojis:** ${normalEmojis} **Animated Emojis:** ${animatedEmojis}\n`+
      `> \n`+
      `> ${em.rocket} __**BOOSTING INFORMATION**__ ${em.rocket}\n`+
      `> **Boost Count:** ${guild.premiumSubscriptionCount || "0"}\n`+
      `> **Server Boost Level:** ${boostLevel}\n`+
      `> **Number of Boosters:** ${boosters}\n`+
      `> **Boosters:** ${boosterNames.length === 0 ? "No Boosters" : boosterNames}\n`+
      `> **Boost Tier:** ${guild.premiumTier} Tier ${guild.premiumTier}\n`+
      `> **Progress Bar Enabled:** ${guild.premiumProgressBarEnabled}\n`+
      `> \n`+
      `> ${em.book} __**ADDITIONAL INFORMATION**__ ${em.book}\n`+
      `> **AFK Channel:** ${guild.afkChannel}\n`+
      `> **Vanity URL:** ${guild.vanityURLCode}\n`+
      `> **Maximum Members:** ${guild.maximumMembers}\n`+
      `> **Total Banned Members:** ${guild.bans.cache.size}\n`+
      `> **Message Notifications:** ${guild.defaultMessageNotifications}\n`+
      `> **Created At:** <t:${~~(guild.createdTimestamp / 1000)}:f> <t:${~~(guild.createdTimestamp / 1000)}:R>\n`
    )
    .setImage(ec.image)
    .setTimestamp()

    interaction.followUp({ embeds: [info] })
  }
}
