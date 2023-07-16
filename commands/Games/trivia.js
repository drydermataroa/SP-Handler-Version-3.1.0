const db = require('quick.db');
const quiz = require('../../structures/Json/questions.json');
const { MessageEmbed } = require("discord.js");
const currency = "💩"

module.exports = {
  name: "trivia",
  description: "Play quiz with me!",
  emoji: "😅",
  
  run: async (client, message, args, prefix) => {

    const item = quiz[Math.floor(Math.random() * quiz.length)];
    let bal = db.fetch(`wallet_${message.author.id}`)
    let trivia = new MessageEmbed()
      .setAuthor({
        name: `${message.author.username}'s Trivia`
      })
      .setDescription(`${item.question}\n\n **Options** \n ${item.options.join(`\n`)}`)
      .setFooter({
        text: 'You only have 15 secs to answer this!'
      })
    const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && response.author.id === message.author.id;
    };
    message.reply({ embeds: [trivia], fetchReply: true })
      .then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
          .then(collected => {
            message.reply(`You got the correct answer! and won 5000 ${currency} on your head 😂😂🤣🤣 **LMFAO**`);
            db.add(`wallet_${message.author.id}`, 4000)
          })
          .catch(collected => {
            message.reply('You did not answer in time or your answer was wrong!');
          });
      });
    
  }
  }
