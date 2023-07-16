const arrayMove = require('array-move-item');

module.exports = {
  name: "race",
  description: "Race with friends",
  emoji: "💾",

    run: async(client, message, args) => {
        let gamemode
        if ((args[1]) == 'car' || (args[1]) == 'cars') gamemode = 'car'
        else if ((args[1]) == 'horse' || (args[1]) == 'horse') gamemode = 'horse'
        else if ((args[1]) == 'bike' || (args[1]) == 'bikes') gamemode = 'bike'
        else gamemode = 'car'

        let emos = {
            car: [
                '🏎️',
                '🚗',
                '🚙',
                '🏎️',
                '🚗'
            ], horse: [
                '🐎',
                '<:horser:894532824105893929>',
                '<:horsep:894532618962501673>',
                '<:horseg:894532937658298388>',
                '<:horseb:894532764362231828>'
            ], bike: [
                '🚲',
                '🚲',
                '<:biker:894540237684998174>',
                '<:bikev:894540401149612032>',
                '<:bikey:894540342878142484>'
            ]
        };
        const userEmos = {};
        let winner;

        message.channel.send('🏁 Race has begun! Type \`join race\` to join the race! 🏁\nThe race will begin in 1 minute!')
        const filter = m => m.content.toLowerCase().startsWith('join race');
        const collector = message.channel.createMessageCollector({
            filter: filter,
            time: 60000
        });
        var participants = [];
        collector.on('collect', m => {
            if (!participants.includes(m.author.id)) {
                if (participants.length >= 2) return message.channel.send('Maximum 2 people can join a race')
                participants.push(m.author.id);
                userEmos[`<@${m.author.id}>`] = emos[gamemode][Math.floor(Math.random() * emos[gamemode].length)];
                m.channel.send(`<@${m.author.id}> joined`)
            }
        });

        collector.on('end', async () => {
            if (participants.length < 1) {
                return message.channel.send('There is not enough people sorry')
            }
            participants = participants.map(item => {
                return '<@' + item + '>';
            })
            const players = participants.join(', ')
            message.channel.send(` ${participants.length} ppl joined. Participants - ${players}`)

            var race_msg = []
            participants.forEach(player => {
                race_msg.push(`🏁 ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ≡ ${userEmos[player]} ${player}`)
            })
            let racemsg = race_msg.join('\n')
            let e = racemsg
            const msg = await message.channel.send(racemsg)
            const interval = setInterval(function () {
                e = move(e, interval)
                message.channel.messages.edit(msg.id, e)
            }, 3000)

            const move = function (racemsg, interval) {
                var race_msg = racemsg.split("\n")

                if (!race_msg.every(e => {
                    if (e.includes('🚩')) return true
                })) {
                    race_msg = race_msg.map(thing => {
                        if (!thing.includes('🚩')) {

                            const movement_number = Math.round(Math.random() * 3)
                            var _obj = thing.split(' ')
                            objectindex = _obj.indexOf(userEmos[_obj[13]])
                            if (objectindex - movement_number < 2) {
                                _obj = arrayMove(_obj, objectindex, 1)
                                if (!winner) winner = _obj[13]
                                return `🚩 ${_obj.slice(1).join(' ')}`

                            }
                            _obj = arrayMove(_obj, objectindex, objectindex - movement_number)
                            _obj = _obj.join(' ')

                            return _obj

                        } else return thing
                    })
                    return race_msg.join('\n')
                } else {
                    clearInterval(interval)
                    message.channel.send(`🚩 Race Results! 🚩\nWinner: ${winner}`)
                }
            }


        });
    }
}