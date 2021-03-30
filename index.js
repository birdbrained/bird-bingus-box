const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = "?";

client.on("message", function(message)
{ 
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(' ');
	const cmd = args.shift().toLowerCase();
	
	if (cmd == "help")
		message.channel.send('no');
	
	else if (cmd == "h")
	{
		message.channel.send('Available commands: ?roastme ?roll ?toast');
	}
	
	else if (cmd == "roastme")
	{
		var start = ['Go to heck you ', 'Get a job you ', 'You ', 'You\'re a ', 'Hey, you ', 'Eat a cabbage you ', 'You look like a ', 'I bet you\'re a ', 'Get fukt you '];
		var adjective = ['stanky ', 'stinky ', 'big word uncomprehendin\' ', 'fart-brained ', 'garlicky ', 'slightly overcooked ', 'omegalol ', 'two-bit ', 'dum ', 'aesthetic ', 'nose-pickin\' ', 'popscile-lookin\' ', 'deadpan ', 'shit-nosed ', 'grandma-lookin\' ', 'beeg ', 'stupi ', 'cheesy ', 'small, but deadly ', 'not very cash-money '];
		var noun = ['wunker-bunker', 'pee-pee-poo-poo', 'poo-poo head', 'bonkizoid', 'chungus', 'parchinko', 'piSS SHIT COCK FUCKER', 'loaf of bread', 'monke', 'omega dorkizorko', 'raisin', 'box of cereal', 'slimer', 'calzone', 'arfarfinarf', 'idjit', 'tree-face', 'utter futter nutter']; 

		var s1 = start[Math.floor(Math.random() * start.length)];
		var s2 = adjective[Math.floor(Math.random() * adjective.length)];
		var s3 = noun[Math.floor(Math.random() * noun.length)];
		var res = s1.concat(s2);
		var res2 = res.concat(s3);
		var res3 = res2.concat('!');
		message.reply(res3);
	}
	
	else if (cmd == "roll")
	{
		var roll = '!roll ';
		var roll2 = roll.concat(args[0]);
		message.channel.send(roll2);
	}
	
	else if (cmd == "toast")
		message.channel.send('https://liftoff-shop.imgix.net/niantic/images/callouts/Toast_Double_800.jpg');
	
	else if (cmd == "teeth")
	{
		//const teeth = client.emojis.find(emoji => emoji.name === "128TEETHx128TEETH");
		message.channel.send('<:128TEETHx128TEETH:805660411528740864>');
	}
	
	else if (cmd == "pasta")
	{
		var pasta_arr = ['https://i.pinimg.com/originals/71/f1/51/71f1516aadd981cfbac6206b7d25956d.jpg',
			'https://s3.burpple.com/foods/4e0fc47b532ad19d7241649026_original.?1530163461',
			'https://static9.depositphotos.com/1001370/1150/i/950/depositphotos_11500692-stock-photo-spaghetti-bolognese-on-white-plate.jpg',
			'https://i2.wp.com/www.lifeasastrawberry.com/wp-content/uploads/2015/01/spicy-tomato-pasta-1.jpg',
			'https://juliasalbum.com/wp-content/uploads/2015/06/18102933370_01753b3001_c.jpg',
			'https://everylittlecrumb.com/wp-content/uploads/pinksaucepasta-scaled.jpg',
			'https://cdn.britannica.com/88/125888-050-CAC13FC1/Pasta-pesto-tomatoes.jpg',
			'fazool',
			'https://amorebrand.com/wp-content/uploads/2018/02/Pasta-Fazool.jpg',
			'https://hips.hearstapps.com/del.h-cdn.co/assets/15/29/1436981615-pasta-salad-pesto-delish.JPG',
			'https://gianni.tv/wp-content/uploads/2012/12/Pasta-Fazool.jpg',
			'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/0d8672b491e84ccbb6c04dedc1bffd39/FB-FinalReview-Revised.jpg?output-format=auto&output-quality=auto',
			'https://assets.bonappetit.com/photos/57af6c7af1c801a1038bd2e6/16:9/w_1280,c_limit/ligurian-pesto-with-spaghetti.jpg'];
		message.channel.send(pasta_arr[Math.floor(Math.random() * pasta_arr.length)]);
	}
	
	else if (cmd == "gbccwb")
		message.channel.send('Did you just say Grandma Brownie\'s Chocolate Chunker Wunker Bunkers, now with even bigger chunks of chocolate chunks?');
}); 

client.login(config.BOT_TOKEN);
