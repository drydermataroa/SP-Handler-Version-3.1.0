const db = require('quick.db')
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed");

module.exports = {
    name: "blacklist",
    description: "🔨 | Warn A User,Remove A Warn,Clear All Warns",
    userPermissions: ['MANAGE_GUILD'],
    options: [
      {
            type: "SUB_COMMAND",
            name: "addwords",
            description: "Add Words To Blacklist In Your Server",
            options: [{
                name: 'words',
                type: 'STRING',
                description: 'If there is more than a word, then split words with space, eg.()',
                required: true,
            }],
        },
        {
            type: "SUB_COMMAND",
            name: "checkwords",
            description: "Check The BlackListed Words In The Server",
            
        },
        {
            type: "SUB_COMMAND",
            name: "clearall",
            description: "Clear All Blacklisted Words In The Server",
            
        },     
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [subcommand] = args;
        
        if(subcommand === 'addwords'){
            const embednoob = new MessageEmbed()
        
            const string = interaction.options.getString('words')
            
            const array = string.split(' ').filter(w => w !== '');
            let nob = new MessageEmbed()
            .setColor(ec.color)
            .setDescription(`:x: **You Can Only Add 10 Words At Once**`)
            if(array.length>9) return interaction.followUp({embeds : [nob]})
            let bruh;
            let n = 1;
               
            for(i=0; i < array.length; i++){
              db.push(`blacklistedwords_${interaction.guildId}.words`, array[i])
              bruh += `\`${n}\`. ${array[i]}` + '\n';
              n++;
            }    
            
            embednoob.setTitle('**Added These Words As Blacklisted Words For This Servers**')
            embednoob.setDescription(bruh.replace('undefined', ''))
            embednoob.setColor(ec.color)
        
             return interaction.followUp({ embeds: [embednoob] });
        }
        if(subcommand === 'checkwords'){
            let noob = db.fetch(`blacklistedwords_${interaction.guildId}.words`)
        
        if(noob === null) return interaction.followUp({content : 'There Are No Blacklisted Words In This Server!!!'})
        let bruh;                                                               
        let n = 1;
           
        for(i=0; i < noob.length; i++){
          
          bruh += `\`${n}\`. ${noob[i]}` + '\n';
          n++;
        }    
        let embed = new MessageEmbed()
        .setTitle(`Current Blacklisted Words In This Server`)
        .setColor(ec.color)
        .setDescription(`${bruh.replace('undefined', '')}`)
       return interaction.followUp({embeds : [embed]})
        }
        if(subcommand === 'clearall'){
         let noob = db.fetch(`blacklistedwords_${interaction.guildId}`)   
         db.delete(`blacklistedwords_${interaction.guildId}`)
                if(noob === null){
                    let bruh = new MessageEmbed()
                    .setDescription(`There Are No Blacklisted Words To Delete`)
.setColor(ec.red)
                    return interaction.followUp({embeds : [bruh]})
                }
                
         return interaction.followUp({content: 'Deleted The Black Listed Words From Database'});
        }        
    }
}