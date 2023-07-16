const client = require("../../index");
const { MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed")

client.on("interactionCreate", async (interaction) => {
    //////////////////////////////
    /// Slash Command Handling ///
    /////////////////////////////
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

      /////////////////////////////
     /// userPermission Handler ///
     /////////////////////////////
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) 
        return interaction.followUp({ 
          embeds: [
            new MessageEmbed()
            .setTitle("__**WARNING PERMISSIONS**__")
            .setColor(ec.color)
            .setImage(ec.image)
            .setDescription(`You do not have **${cmd.userPermissions}** to run this command`)
            .setFooter({ text: ec.footer, iconURL: ec.iconURL})
            .setTimestamp()
          ]
        });

        cmd.run(client, interaction, args);
    }

    //////////////////////////////////////////
    /////////////CONTEXT HANDLER//////////////
    //////////////////////////////////////////
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})