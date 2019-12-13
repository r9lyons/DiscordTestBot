const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json');
const botTokk = auth.token

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

var punctuation = [ ".", "?", "!", ")"]
var kickWords = ["codie"]
var swears = ["fuck", "ass", "shit", "bastard", "bitch", "hell", "cunt", "eric", "love", "piss", "damn", "dick"]
var containSwear
var notSentence
var byBot

client.on('message', msg => 
{
	try {
		if (msg.author.bot == false)
		{
			var channel = msg.channel
			var message = msg.content
			notSentence = true
			kickWords.forEach(kickCheck)
			function kickCheck(item)
			{
				if (message.toLowerCase().includes(item))
				{
					msg.member.kick()
					notSentence = true
					msg.delete()
					msg.reply("has spoken the words never to be spoken...")
				}
			}
			if (message.substring(0,1) == '?')
			{
				var args = message.substring(1).split(' ');
				var cmd = args[0];
				switch(cmd) 
				{
					// !ping
					case 'ping':
						msg.reply('Pong?')
						break;
					// Just add any case commands if you want to..
				}
			}
			else if (msg.mentions.channels.array().length > 0 || msg.mentions.members.array().length > 0 || msg.mentions.roles.array().length > 0
				|| msg.mentions.users.array().length > 0 || msg.mentions.everyone == true)
			{
			}
			else if (message.includes("https://") || message.includes("http://"))
			{
			}
			else if (msg.attachments.array().length > 0)
			{
			}
			else if (msg.type != "DEFAULT")
			{
			}
			else if (message.substring(0,1) == '!')
			{
			}
			else
			{
				notSentence = false
			}
			
			swears.forEach(containsSwearWord)
			function containsSwearWord(item)
			{
				var lower = message.toLowerCase()

				if (lower.includes(item))
				{
					letter = item.substring(0,1).toUpperCase()
					msg.reply(`That is not appropriate language. Do not use the ${letter}-word in here.`)
					msg.delete()
					msg.deleted = true
				}
			}
			
			if (!notSentence && msg.deleted == false)
			{
				var lastChar = message.charAt(message.length - 1)
				var index = punctuation.indexOf(lastChar)
				if (index == -1)
				{
					msg.delete()
					msg.reply("You must finish your sentences with punctuation.")
				}
			}
		}
	}
	catch (e) 
	{
        console.log(e);
    }
})

client.login(botTokk)
