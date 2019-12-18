const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json');
const readJson = require('./package.json')
const botTokk = auth.token
const botName = readJson.name

client.on('ready', () => {
	censorshipBool = false
	languageBool = false
	console.log(`Logged in as ${client.user.tag}!`)
})

var punctuation = [ ".", "?", "!", ")"]
var kickWords = ["codie"]
var swears = ["fuck", "ass", "shit", "bastard", "bitch", "hell", "cunt", "eric", "love", "piss", "damn", "dick", "deadass",
	"chucklefuck", "retard", "thundercunt", "knucklefuck", "horseshit", "motherfucker"]
var questionWords = ["who", "what", "where", "when are", "when is", "when will", "when do", "why", "how", "whose", "is", "will"]
var insults = ["you fucking suck", "you. are. shit", "fuck off", "you should have been a stain on your parents bed sheets", "coward",
				"I bet you suck toes", "you are lucky mirrors can't laugh", "you are the reason the gene pool needs a lifeguard",
				"you have something on your chin. No, no the 3rd one down", "some day you'll go far and I hope you stay there",
				"I'd like to kick you in the teeth, but there is no reason for me to improve your looks",
				"just shut up once", "you look like a before picture", "you are as sharp as a bowling ball",
				"your parents must be siblings", "you are a few clowns short of a circus"]
var admins = ["Cyb3rLi0n", "Rockendude"]
var containSwear
var notSentence
var byBot
var channel
var grammarBool
var censorshipBool

function isChar (str) { if (str.match(/[a-z|A-Z|0-9]/i)) { return true; } return false; }

function bash (username)
{
	channel.send(`${username}, ${insults[getRandomInteger(0,16)]}!`)
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//handle any foul language found
function flagFoulLanguage(item, msg)
{
	letter = item.substring(0,1).toUpperCase()
	msg.reply(`That is not appropriate language. Do not use the ${letter}-word in here.`)
		.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
		.catch(console.error);
	msg.delete()
	msg.deleted = true
}

function isSentence(msg)
{
	message = msg.content
	// Check for bot commands
	if (message.substring(0,1) == '?')
	{
		runCommand(msg)
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
		return true
	}
	return false
}

function runCommand(msg)
{
	var args = msg.content.substring(1).split(' ')
	var cmd = args[0];
	switch(cmd) 
	{
		// ?ping
		case 'ping':
		{
			msg.reply('Pong?')
				.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
				.catch(console.error);
			break;
		}
		case 'bash':
		{
			if (msg.mentions.users.find(element => element.username === botName) == null)
			{
				bash(args[1])
			}
			else
			{
				msg.reply("I will not do that to myself.")
					.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
					.catch(console.error);
			}
			break;
		}
		case 'togglegrammar':
		{
			if (admins.find(admin => admin === msg.author.username) != null)
			{
				grammarBool = !grammarBool
				msg.reply(`Toggling grammar. Now set to: ${grammarBool}`)
					.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
					.catch(console.error);
			}
			break;
		}
		case 'togglecensorship':
		{
			if (admins.find(admin => admin === msg.author.username) != null)
			{
				censorshipBool = !censorshipBool
				msg.reply(`Toggling censorship. Now set to: ${censorshipBool}`)
					.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
					.catch(console.error);
			}
			break;
		}
		// Just add any case commands if you want to..
	}
}

client.on('message', msg => 
{
	try {
		if (msg.author.bot == false)
		{
			channel = msg.channel
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
						.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
						.catch(console.error);
					msg.deleted = true
				}
			}
			
			//checks for end punctuation, if grammar is turned on
			if (grammarBool)
			{
				if (isSentence(msg) && msg.deleted == false)
				{
					var lastChar = message.charAt(message.length - 1)
					var question = false
					questionWords.forEach(function (element){ if(message.startsWith(element)){question = true}});
					if (!question || lastChar == '?')
					{
						var index = punctuation.indexOf(lastChar)
						if (index == -1)
						{
							msg.reply("You really should finish your sentences with punctuation.")
								.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
								.catch(console.error);
						}
					}
					else
					{
						msg.reply("That was a question, it needs to end with a question mark.")
							.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
							.catch(console.error);
					}
					
				}
			}
			else
			{
				if (message.substring(0,1) == '?')
				{
						runCommand(msg)
				}
			}
			
			//Don't let people @ Tannerith
			if (msg.mentions.users.find(val => val.username === 'Tannerith') != null)
			{
				msg.reply("We don't like talking to them.")
					.then(sent => console.log(`Sent a reply to ${msg.author.username}`))
					.catch(console.error);
			}
			
			//react with weary when someone joins server
			if (msg.type == "GUILD_MEMBER_JOIN")
			{
				msg.react("😩")
					.then(console.log)
					.catch(console.error);
			}
			
			//Check for swear words in message, if censorship is turned on
			if (censorshipBool)
			{
				swears.forEach(containsSwearWord)
				function containsSwearWord(item)
				{
					if (message.includes(item))
					{
						if (!(message == item))
						{
							var index = message.indexOf(item)
							if (!isChar(message.charAt(index - 1)))
							{
								flagFoulLanguage(item, msg)
							}
						}
						else
						{
							flagFoulLanguage(item, msg)
						}
					}
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