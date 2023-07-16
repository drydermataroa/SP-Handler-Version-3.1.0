const { CommandInteraction, MessageEmbed } = require("discord.js");
const levelrewardSchema = require("../../structures/Models/LevelReward");
const setupSchema = require("../../structures/Models/LevelingSetup");
const ec = require("../../settings/embed")

module.exports = {
  name: 'level-setup',
  description: '🥇 | Setup level system in the server.',
  userPermission: ["ADMINISTRATOR"],
  options: [
    {
      name: 'view',
      description: '🥈 | View the current setup',
      type: "SUB_COMMAND",
    },
    {
      name: 'reset',
      description: '🥉 | Reset the config',
      type: "SUB_COMMAND",
    },
    {
      name: 'add-reward',
      description: '🏅 | Add a levelling reward',
      type: "SUB_COMMAND",
      options: [
        {
          name: 'level',
          description: 'The level required to get this role',
          type: 'NUMBER',
          required: true,
        },
        {
          name: 'reward',
          description: 'The reward for reaching this level',
          type: 'ROLE',
          required: true,
        },
      ],
    },
    {
      name: 'remove-reward',
      description: '🎖️ | Remove a leveling reward',
      type: "SUB_COMMAND",
      options: [
        {
          name: 'role',
          description: 'The role to remove',
          type: 'ROLE',
          required: true,
        },
      ],
    },
  ],

  /**
 * @param {CommandInteraction} interaction
 */
  run: async (client, interaction, args) => {
    const { options } = interaction;

    try {
      switch (options.getSubcommand()) {
        case "view":
          let docs = await setupSchema.findOne({
            guildId: interaction.guild.id
          })
          if (!docs) {
            setupSchema.create({ guildId: interaction.guild.id })
            return interaction.followUp({ content: "I couldn't find this server in my database. Please try again" })

          }
          const rewards = await levelrewardSchema.find({ guildId: interaction.guild.id })
          if (!rewards) {
            levelrewardSchema.create({ guildId: interaction.guild.id })
            return interaction.followUp({ content: "I couldn't find this server in my database. Please try again" })
          }

          var description = `**Level Rewards**\n`
          for (const reward of rewards) {
            description += `Level ${reward.level} - ${reward.role}\n`
          }

          const embed = new MessageEmbed()
            .setColor(ec.color)
            .setTitle('Level System Settings')
            .setDescription(description)
          interaction.followUp({ embeds: [embed] })
          break;

          break;
        case "reset":
          const reset = await setupSchema.findOne({ guildId: interaction.guild.id })
          if (reset) {
            reset.delete()
            levelrewardSchema.collection.deleteMany({ guildId: interaction.guild.id })
            return interaction.followUp({ content: "Reset the config data" })
          } else {
            return interaction.followUp({ content: "There was no config set" })
          }
          break;
        case "add-reward":
          levelrewardSchema.create({
            guildId: interaction.guild.id,
            level: interaction.options.getNumber('level'),
            role: interaction.options.getRole('reward')
          })
          interaction.followUp({ content: `Level ${interaction.options.getNumber('level')} will reward ${interaction.options.getRole('reward')}`, ephemeral: true })
          break;
        case "remove-reward":
          const result = await levelrewardSchema.findOne({ guildId: interaction.guild.id, role: interaction.options.getRole('role') })
          if (!result) {
            return `Could not find a level reward with that role`
          }
          result.delete()
          return `Deleted that level reward`
          break;
      }
    } catch (err) {
      console.log(err)
    }
  },
};