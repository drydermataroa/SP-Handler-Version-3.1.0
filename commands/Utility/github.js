const { MessageEmbed, MessageButton, MessageActionRow, version } = require('discord.js');
const ec = require('../../settings/embed')
const config = require('../../settings/config.json')
const fetch = require('node-fetch');

module.exports = {
    name: 'github',
    description: 'Get the users github info',
    emoji: '⌛',

    run: async(client, message, args) => {

        let name = args[0]

        const error = new MessageEmbed()
        .setTitle('**❌ERROR INVALID GITHUB USER**')
        .setColor(ec.color)
        .setDescription(`Invalid input | ${config.prefix}github {github username}`)
        .setFooter({ text: `For more info of the command do ${config.prefix}help-github`})

        if (!name) return message.channel.send({ embeds: [error] })

        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setURL(`https://github-readme-stats.vercel.app/api?username=${name}&theme=radical&show_icons=true&hide_border=true.gif`)
            .setLabel('Stats')
            .setStyle('LINK'),
            new MessageButton()
            .setURL(`https://github.com/${name}`)
            .setLabel('Profile')
            .setStyle('LINK'),
            new MessageButton()
            .setURL(`https://github-readme-stats.vercel.app/api/top-langs/?username=${name}&show_icons=true&hide_border=true&layout=compact&langs_count=8&theme=tokyonight`)
            .setLabel('Languages')
            .setStyle('LINK'),
        );

        fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json())
        .then(data => {
            let avatar = data.avatar_url.toLocaleString()
            let type = data.type.toLocaleString()
            let username = data.name.toLocaleString()
            let public_repos = data.public_repos.toLocaleString()
            let public_gists = data.public_gists.toLocaleString()
            let created_at = data.created_at.toLocaleString()
            let updated_at = data.updated_at.toLocaleString()
            let followers = data.followers.toLocaleString()
            let following = data.following.toLocaleString()

            let login = data.login.toLocaleString()

            const gitEmbed = new MessageEmbed()
            .setTitle(`${username}'s Github profile!`)
            .setColor(ec.color)
            .setAuthor({ name: `${message.guild.name}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${name}'s github profile info and stats`)
            .addFields(
                { name: `Username`, value: `${username}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Type`, value: `${type}`, inline: true },
                { name: `Followers`, value: `${followers}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Following`, value: `${following}`, inline: true },
                { name: `Public Repo`, value: `${public_repos}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Public Gists`, value: `${public_gists}`, inline: true },
                { name: `Created At`, value: `${created_at}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Updated At`, value: `${updated_at}`, inline: true },
            )
            .setThumbnail(avatar)
            .setFooter({ text: `For more commands do ${config.prefix}help`})

            message.channel.send({ embeds: [gitEmbed], components: [row] });
        })
    }
}