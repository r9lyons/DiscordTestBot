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
var questionWords = ["who", "what", "where", "why", "how", "whose"]
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
			var message = msg.content.toLowerCase()
			notSentence = true
			
			//check for use a an automatic kick word
			kickWords.forEach(kickCheck)
			function kickCheck(item)
			{
				if (message.includes(item))
				{
					msg.member.kick()
					notSentence = true
					msg.delete()
					msg.reply("has spoken the words never to be spoken...")
					msg.deleted = true
				}
			}
			
			// Start check for anything that doesn't need end punctuation
			
			// Check for bot commands
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
			// Check for a mention
			else if (msg.mentions.channels.array().length > 0 || msg.mentions.members.array().length > 0 || msg.mentions.roles.array().length > 0
				|| msg.mentions.users.array().length > 0 || msg.mentions.everyone == true)
			{
			}
			// Check for a hyperlink
			else if (message.includes("https://") || message.includes("http://"))
			{
			}
			// Check for an attachment
			else if (msg.attachments.array().length > 0)
			{
			}
			// Check for any atypical message
			else if (msg.type != "DEFAULT")
			{
			}
			// Check for command for other bot
			else if (message.substring(0,1) == '!')
			{
			}
			// Check for custom emoji
			else if (message.startsWith("<:"))
			{
			}
			// Check for emoji
			else if (!isChar(message))
			{
			}
			else
			{
				notSentence = false
			}
			
			//Don't let people @ Rockendude
			if (msg.mentions.users.find(val => val.username === 'Rockendude') != null)
			{
				msg.delete()
				msg.deleted = true
				msg.reply("We don't like talking to them.")
			}
			
			//react with Weary when someone joins server
			if (msg.type == "GUILD_MEMBER_JOIN")
			{
				msg.react("😩")
					.then(console.log)
					.catch(console.error);
			}
			
			//Check for swear words in message
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
			
			//handle any foul language found
			function flagFoulLanguage(item)
			{
				letter = item.substring(0,1).toUpperCase()
				msg.reply(`That is not appropriate language. Do not use the ${letter}-word in here.`)
					.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
					.catch(console.error);
				msg.delete()
				msg.deleted = true
			}
			
			//checks for end punctuation
			if (!notSentence && msg.deleted == false)
			{
				var lastChar = message.charAt(message.length - 1)
				var question = false
				questionWords.forEach(function (element){ if(message.startsWith(element)){question = true}});
				if (!question || lastChar == '?')
				{
					var index = punctuation.indexOf(lastChar)
					if (index == -1)
					{
						msg.delete()
						msg.reply("You must finish your sentences with punctuation.")
							.then(sent => console.log(`Sent a reply to ${sent.author.username}`))
							.catch(console.error);
					}
				}
				else
				{
					msg.delete()
					msg.reply("That was a question, it needs to end with a question mark.")
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
