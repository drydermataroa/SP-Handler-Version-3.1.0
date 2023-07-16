const set = require('../settings/settings')

module.exports = {
    commandDisabledMessage: `This command has been disabled for maintenance by bot owner **${set.botOwner}**. Please wait till the command is released....`,
    games : {
        "2048" : true,
        "Connect4" : true,
        "Emojify" : true,
        "FastType" : true,
        "FindEmoji" : true,
        "Fishy" : true,
        "Flood" : true,
        "GuessThePokemon" : true,
        "Hangman" : true,
        "MatchPairs" : true,
        "Minesweeper" : true,
        "RockPaperScissors" : true,
        "Slots" : false,
        "Snake" : true,
        "TicTacToe" : true,
        "Trivia" : true,
        "Wordle" : true,
        "WouldYouRather" : true,
    },
    general: {
        "ping": false,
    }
}