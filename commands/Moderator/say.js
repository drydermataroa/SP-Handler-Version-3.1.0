module.exports = {
  name: 'say',
  description: 'Repeats what you say',
  emoji: '🎱',
  userPerms: ['Administrator'],
  
  run: async (client, message, args, Discord) => {

    const sayM = args.join(' ');
    message.delete().catch(err => console.log(err))
    message.channel.send({ content: sayM})
  }
}