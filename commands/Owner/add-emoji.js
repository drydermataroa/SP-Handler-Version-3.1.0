const Discord = require('discord.js');

module.exports = {
  name: 'add-emoji',
  description: 'An emoji adding cmmd',
  userPerms: ['Administrator'],
  emoji: "😀",

  run: async (client, message, args) => {
    if (!args.length) return message.reply('Please specify an emoji!!')

    for (const emojis of args) {
      const getEmoji = Discord.Util.parseEmoji(emojis);

      if (getEmoji.id) {
        const emojiExt = getEmoji.animated ? ".gif" : ".png";
        const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`
        message.guild.emojis.create(emojiURL, getEmoji.name).then(emoji => message.channel.send(`Successfully added : ${emoji.name} to the server!!`))
      }
    }
  }
}