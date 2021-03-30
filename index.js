const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "?";

var start = ['Go to heck you ', 'Get a job you ', 'You ', 'You\'re a ', 'Hey, you ', 'Eat a cabbage you ', 'You look like a ', 'I bet you\'re a '];
var adjective = ['stanky ', 'stinky ', 'fart-brained ', 'dum ', 'popscile-lookin\' ', 'deadpan ', 'shit-nosed ', 'grandma-lookin\' ', 'beeg ', 'stupi ', 'cheesy ', 'small, but deadly ', 'not very cash-money '];
var noun = ['wunker-bunker', 'poo-poo head', 'bonkizoid', 'chungus', 'omega dorkizorko', 'raisin', 'box of cereal', 'slimer', 'calzone', 'arfarfinarf', 'idjit', 'tree-face']; 

client.on("message", function(message)
{ 
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(' ');
	const cmd = args.shift().toLowerCase();
	
	if (cmd == "roastme")
	{
		var s1 = start[Math.floor(Math.random() * start.length)];
		var s2 = adjective[Math.floor(Math.random() * adjective.length)];
		var s3 = noun[Math.floor(Math.random() * noun.length)];
		var res = s1.concat(s2);
		var res2 = res.concat(s3);
		var res3 = res2.concat('!');
		message.reply(res3);
	}
	
	if (cmd == "roll")
	{
		var roll = '!roll ';
		var roll2 = roll.concat(args[0]);
		message.channel.send(roll2);
	}
}); 

client.login(config.BOT_TOKEN);
