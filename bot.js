const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json');
const botTokk = auth.token

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

var punctuation = [ ".", "?", "!", ")"]
var kickWords = ["codie"]
var swears = ["fuck", "ass", "shit", "bastard", "bitch", "hell", "cunt", "eric", "love", "piss", "damn", "dick", "deadass"]
var containSwear
var notSentence
var byBot

function isChar (str) { if (str.match(/[a-z|A-Z|0-9]/i)) { return true; } return false; }

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
							.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
							.catch(console.error);
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
			else if (message.startsWith("<:"))
			{
			}
			else if (!isChar(message))
			{
			}
			else
			{
				notSentence = false
			}
			
			if (msg.type == "GUILD_MEMBER_JOIN")
			{
				var weary = msg.client.emojis.find(emoji => emoji.name == "weary");
				if (weary)
				{
					msg.react(weary.id)
						.then(console.log)
						.catch(console.error);
				}
			}
			
			swears.forEach(containsSwearWord)
			function containsSwearWord(item)
			{
				var lower = message.toLowerCase()

				if (lower.includes(item))
				{
					if (!(lower == item))
					{
						var index = lower.indexOf(item)
						if (!isChar(lower.charAt(index - 1)))
						{
							flagFoulLanguage(item)
						}
					}
					else
					{
						flagFoulLanguage(item)
					}
				}
			}
			
			function flagFoulLanguage(item)
			{
				letter = item.substring(0,1).toUpperCase()
				msg.reply(`That is not appropriate language. Do not use the ${letter}-word in here.`)
					.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
					.catch(console.error);
				msg.delete()
				msg.deleted = true
			}
			
			if (!notSentence && msg.deleted == false)
			{
				var lastChar = message.charAt(message.length - 1)
				var index = punctuation.indexOf(lastChar)
				if (index == -1)
				{
					msg.delete()
					msg.reply("You must finish your sentences with punctuation.")
						.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
						.catch(console.error);
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
