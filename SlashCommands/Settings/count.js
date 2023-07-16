const countingSchema = require("../../structures/Models/counting")

module.exports = {
  name: 'set-count',
  description: '⌛ | Setup a counting system channel.',
  userPermissions: ['ADMINISTRATOR'],
  options: [
    {
      name: 'channel',
      description: 'Select a channel to setup.',
      type: 'CHANNEL',
      required: true,
    },
  ],
  
  run : async (client, interaction, args) => {
    const channel = interaction.options.getChannel("channel")
      
    const counting = await countingSchema.findOneAndUpdate(
    {
      guild: interaction.guild.id
    }, {
      channel: channel.id
    }
    )

    if(counting) {
       interaction.followUp({ content: `Updated counting channel to ${channel}`})
    } else {

      await countingSchema.create({
        lastUser: client.user.id,
        lastNumber: 0,
        channel: channel.id,
        guild: interaction.guild.id
      })

      interaction.followUp({ content: `Counting channel set to ${channel}`})
    }

}
}