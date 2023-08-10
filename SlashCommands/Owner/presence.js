const ec = require('../../settings/embed')

module.exports = {
    name: 'presence',
    description: 'Allows you to set the rich presence of the bot.',
    ownerOnly: true,
    options: [
        {
            name: 'type',
            description: 'Select the type of presence you want to use.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Playing',
                    value: 'PLAYING',
                },
                {
                    name: 'Listening',
                    value: 'LISTENING',
                },
                {
                    name: 'Watching',
                    value: 'WATCHING',
                },
                {
                    name: 'Competing',
                    value: 'COMPETING',
                },
            ],
        },
        {
            name: 'status',
            description: 'Enter the status to go with the presence type.',
            type: 'STRING',
            required: true,
        },
    ],

    run: async(client, interaction, args) => {
        client.user.setPresence({
			activities: [
				{
					name: interaction.options.getString('status'),
					type: interaction.options.getString('type'),
				},
			],
		});
        interaction.followUp({
			embeds: [
				{
					title: 'Status Successfully Changed',
					color: ec.color,
					timestamp: new Date(),
					fields: [
						{ name: 'Type', value: interaction.options.getString('type'), inline: true },
						{ name: 'Status', value: interaction.options.getString('status'), inline: true },
					],
				},
			],
		});
	},
};