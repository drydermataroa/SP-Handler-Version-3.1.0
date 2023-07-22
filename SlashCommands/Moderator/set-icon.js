const {Client, CommandInteraction, MessageEmbed} = require('discord.js');
const ec = require('../../settings/embed')

module.exports = {
    name: 'seticon',
    description: 'Set the icon of the server',
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'icon',
            description: 'The icon to set',
            type:'STRING',
            required:true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

            const icon = interaction.options.getString('icon')
            interaction.guild.setIcon(icon);

            const newicon = new MessageEmbed()
                .setTitle('Icon Changed')
                .setImage(icon)
                .setColor(ec.color)
                .setTimestamp()
            
            return interaction.followUp({embeds:[newicon]})
    }
}