const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const EmojiRegex = require('emoji-regex/RGI_Emoji.js');
const client = new Discord.Client();
const prefix = "?";

//enum PlayerState
//{
//	Idle = 0,
//	InBattle = 1
//}

function createFile(filename)
{
  fs.open(filename, 'r', function(err, fd)
  {
    if (err) {
      fs.writeFile(filename, '{\n}', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("The file was saved!");
      });
    } else {
      console.log("The file exists!");
    }
  });
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function formatPlayerHpBar(json_data)
{
	if (!json_data) return "ERR";
	var filled_square = Math.floor(json_data.hp/json_data.max_hp * 10);
	var bar = "[";
	var i = 0;
	
	console.log("I should draw " + filled_square.toString() + " filled squares");
	
	for (i = 0; i < filled_square; i++)
	{
		bar += '▮';
	}
	for (filled_square = filled_square; filled_square < 10; filled_square++)
	{
		bar += '▯';
	}
	bar += "] " + json_data.hp.toString() + "/" + json_data.max_hp.toString();
	return bar;
}

function formatPlayerMpBar(json_data)
{
	if (!json_data) return "ERR";
	var filled_square = Math.floor(json_data.mp/json_data.max_mp * 10);
	var bar = "[";
	var i = 0;
	
	console.log("I should draw " + filled_square.toString() + " filled squares");
	
	for (i = 0; i < filled_square; i++)
	{
		bar += '▮';
	}
	for (filled_square = filled_square; filled_square < 10; filled_square++)
	{
		bar += '▯';
	}
	bar += "] " + json_data.mp.toString() + "/" + json_data.max_mp.toString();
	return bar;
}

client.on("message", function(message)
{ 
	/*if (message.author.id == "811415479855611904")
	{
		message.channel.send(message.content);
		message.delete();
		return;
	}*/
	
	if (message.author.bot) return;
	
	// Replace all emojis to leave just the text, if any.
	//const text = message.content.replace(/:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g, '');
	//const text = message.content.replace(/:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g, '').replace(/\s+/g, '');
	/*const og_msg = message.content;
	const text = message.content.replace(/:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g, '').replace(new EmojiRegex(), '').replace(/\s+/g, '').replace(' ', '');


	// Check if 'text' is not blank to see if there are characters which are not used in emojis.
	//if ((message.content.startsWith('<a:') || message.content.startsWith('<:')) && message.content.endsWith('>')) {
	// message.channel.send(message.content); 
	//}
	//else
	//{
	//	message.delete().catch(console.error);
	//  message.reply("emotes only reeeeeeeeeeeeeeeeeee");
	//}
	
	if (text)
	{
		message.delete().catch(console.error);
	  message.reply("emotes only reeeeeeeeeeeeeeeeeee");
	}
	else
	{
		if (og_msg) message.channel.send(og_msg);
	}*/
	
	if (!message.content.startsWith(prefix)) return;
	
	const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(' ');
	const cmd = args.shift().toLowerCase();
	
	var user_id = message.author.id;
	var user_file = user_id.concat('.json');
	var users_dir = './player_data/';
	user_file = users_dir.concat(user_file);
	
	if (cmd == "help")
		message.channel.send('no');
	
	else if (cmd == "h")
	{
		message.channel.send('Available commands:\n\n?battle\n?gbccwb\n?pasta <index, optional>\n?roastme\n?roll\n?startgame\n?teeth\n?toast');
	}
	
	else if (cmd == "roastme")
	{
		var start = ['Go to heck you ', 'Get a job you ', 'You ', 'You\'re a ', 'Hey, you ', 'Eat a cabbage you ', 'Why are you such a ', 'How can you be such a ', 'You remind me of a ', 'Hey hey, you you ', 'You look like a ', 'I bet you\'re a ', 'Get fukt you '];
		var adjective = ['stanky ', 'pizza-hatin\' ', 'stinky ', 'big word uncomprehendin\' ', 'fart-brained ', 'garlicky ', 'decaying ', 'pasta-hatin\' ', 'slightly overcooked ', 'omegalol ', 'two-bit ', 'dum ', 'aesthetic ', 'nose-pickin\' ', 'popscile-lookin\' ', 'deadpan ', 'shit-nosed ', 'grandma-lookin\' ', 'beeg ', 'stupi ', 'cheesy ', 'small, but deadly ', 'not very cash-money '];
		var noun = ['wunker-bunker', 'pee-pee-poo-poo', 'BEE', 'guy at Home Depot that cuts the wood', 'plumber', 'corpse', 'poo-poo head', 'bonkizoid', 'chungus', 'parchinko', 'piSS SHIT COCK FUCKER', 'loaf of bread', 'monke', 'omega dorkizorko', 'raisin', 'box of cereal', 'slimer', 'calzone', 'arfarfinarf', 'idjit', 'tree-face', 'utter futter nutter']; 

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
		var roll = '>roll ';
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
		var opt_arg = args[0];
		
		var pasta_arr = ['https://i.pinimg.com/originals/71/f1/51/71f1516aadd981cfbac6206b7d25956d.jpg',
			'https://s3.burpple.com/foods/4e0fc47b532ad19d7241649026_original.?1530163461',
			'https://static9.depositphotos.com/1001370/1150/i/950/depositphotos_11500692-stock-photo-spaghetti-bolognese-on-white-plate.jpg',
			'https://i2.wp.com/www.lifeasastrawberry.com/wp-content/uploads/2015/01/spicy-tomato-pasta-1.jpg',
			'https://juliasalbum.com/wp-content/uploads/2015/06/18102933370_01753b3001_c.jpg',
			'https://everylittlecrumb.com/wp-content/uploads/pinksaucepasta-scaled.jpg',
			'https://cdn.britannica.com/88/125888-050-CAC13FC1/Pasta-pesto-tomatoes.jpg',
			'fazool',
			'https://allhailtheblackmarket.com/wp-content/uploads/2018/03/pumpkin-squash-elbow-macaroni-cheese-720.jpg',
			'https://amorebrand.com/wp-content/uploads/2018/02/Pasta-Fazool.jpg',
			'https://hips.hearstapps.com/del.h-cdn.co/assets/15/29/1436981615-pasta-salad-pesto-delish.JPG',
			'https://i1.wp.com/thefulcrum.ca/wp-content/uploads/2011/09/OPINIONS_Religious-pasta_Mico-Mazza.jpg?fit=740%2C1110&ssl=1',
			'https://gianni.tv/wp-content/uploads/2012/12/Pasta-Fazool.jpg',
			'https://upload.wikimedia.org/wikipedia/commons/9/90/Touched_by_His_Noodly_Appendage_HD.jpg',
			'https://img.brut.media/w600/thumbnail/what-is-the-church-of-the-flying-spaghetti-monster--0571e7cd-5050-4303-8a67-0f6ee8546da1-square.jpg?ts=1569016499;',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWFziWDBJntvdn8dWomvzhUqqfaCbMmf7EA&usqp=CAU',
			'https://i.kym-cdn.com/photos/images/facebook/001/299/468/819.jpg',
			'https://www.finedininglovers.com/sites/g/files/xknfdk626/files/styles/open_graph_image/public/Original_14271_ramsay-pasta.png?itok=rojQGC4D',
			'https://media-cdn.tripadvisor.com/media/photo-s/0e/bc/2d/40/worst-pasta-everis-this.jpg',
			'https://i.redd.it/4cj83uja8ll51.jpg',
			'https://i.pinimg.com/originals/0e/fa/bc/0efabce3f00487b9c0cb986e469454a6.jpg',
			'https://preview.redd.it/lyvvhm7nhk161.jpg?auto=webp&s=304eb12a7620e9240b652468aba1dd92d1db6866',
			'https://i.dailymail.co.uk/i/pix/2018/01/23/15/487F02C100000578-5301865-image-a-59_1516720814056.jpg',
			'https://i.ytimg.com/vi/1TX5imh2VRE/maxresdefault.jpg',
			'https://kidzonemuseum.org/wp-content/uploads/2018/12/rainbowpasta.jpg',
			'https://media.istockphoto.com/photos/one-piece-of-big-pasta-isolated-on-white-background-picture-id918629776?k=6&m=918629776&s=170667a&w=0&h=Weyq6kZLg3PoWl-6ELKcvOYgTLGR-8XT6N0RwWD_-dM=',
			'https://img.buzzfeed.com/buzzfeed-static/static/2019-08/31/0/campaign_images/62829a9c6f07/19-pasta-fails-so-bad-theyre-maybe-even-kind-of-f-2-1072-1567211075-0_dblbig.jpg',
			'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/01/pjimage-2021-01-07t225112-1610040077.jpg',
			'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/0d8672b491e84ccbb6c04dedc1bffd39/FB-FinalReview-Revised.jpg?output-format=auto&output-quality=auto',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJeXZSW7pCa6DI87wiIVzm6oxrpSS9Zq44g&usqp=CAU',
			'https://assets.bonappetit.com/photos/57af6c7af1c801a1038bd2e6/16:9/w_1280,c_limit/ligurian-pesto-with-spaghetti.jpg',
			'https://pbs.twimg.com/media/DkQO4PjX0AAiTmZ.jpg',
			'https://freshhealthyeats.com/wp-content/uploads/2013/10/Burnt-Pasta-for-Cooking-Fails.jpg',
			'https://i.pinimg.com/originals/09/b7/75/09b775b2160b882160a8dccb646a2410.jpg',
			'http://media.foodnetwork.ca/recipetracker/4dcf3486-eb41-41f9-be1d-8b5a84a48637_burnt-ends-spaghetti-grilled-cheese_webready.jpg',
			'https://blog.studentsville.it/wp-content/uploads/2018/03/giphy-1.gif',
			'https://i.gifer.com/MNu.gif',
			'https://holycowvegan.net/wp-content/uploads/2020/01/masala-pasta-indian-street-style-9.jpg',
			'https://i.gifer.com/3QB.gif',
			'https://i.pinimg.com/originals/ea/16/87/ea1687630df89db6030b82e9028b20dd.gif',
			'https://assistologyomaha.files.wordpress.com/2017/08/uq0r1ef.gif',
			'https://www.eatwell101.com/wp-content/uploads/2019/10/Creamy-Chicken-and-Pasta-Recipe-3.jpg',
			'https://media.tenor.com/images/e2db8b7b9dcba61b0d572a522996336a/tenor.gif',
			'https://i.imgur.com/CrLlkRm.jpg',
			'https://i.pinimg.com/474x/9a/c0/94/9ac09430d8dda6bb56472d9b76eb30a9.jpg',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJTKy5FCOdOQAz75gC0SqKHxywM6oeE0I_7w&usqp=CAU',
			'https://static.parade.com/wp-content/uploads/2020/11/hotcheetomacncheese-1.jpg'
			];
			
		if (opt_arg)
		{
			if (!isNumeric(opt_arg))
				message.reply("that only works with numbers! 0 to ".concat((pasta_arr.length- 1).toString()));
			else
			{
				var index = parseInt(opt_arg, 10);
				if (index < 0 || index >= pasta_arr.length)
					message.reply("that number is out of range! 0 to ".concat((pasta_arr.length - 1).toString()));
				else if (index == 7)
					message.channel.send(pasta_arr[Math.floor(Math.random() * pasta_arr.length)]);
				else
					message.channel.send(pasta_arr[index]);
			}
		}
		else
		{
			message.channel.send(pasta_arr[Math.floor(Math.random() * pasta_arr.length)]);
		}
	}
	
	else if (cmd == "gbccwb")
	    message.channel.send('Did you just say Grandma Brownie\'s Chocolate Chunker Wunker Bunkers, now with even bigger chunks of chocolate chunks?');

	else if (cmd == "startgame")
	{
	    //var user_id = message.author.id;
	    //var user_file = user_id.concat('.json');
	    //var users_dir = './player_data/';
	    //user_file = users_dir.concat(user_file);

	    //fs.appendFile(user_file, '', (err) => {
	    //    if (err) console.log(err);
	    //});
		
		//createFile(user_file);
		
		const player_name = message.content.substring(message.content.indexOf(' ') + 1);
		if (!player_name)
		{
			message.reply("glad to see you want to start the game! Please run this command again, but pass in your character's name as an arguement. ?startgame Bird");
			return;
		}
		
		try {
			if (fs.existsSync(user_file)) 
			{
				console.log("file exists");
				message.reply("you've already started the game!");
			}
			else
			{
				console.log("file does not exist");
				fs.writeFileSync(user_file, "{\n}");
				
				var file = fs.readFileSync(user_file);
				var fp = JSON.parse(file);
				//if (!fp)
				//{
					var json_data = { name: player_name, xp: 0, hp: 10, max_hp: 10, mp: 10, max_mp: 10, curr_state: 0, weapon_l_id: 0, weapon_r_id: 0, spell_id: 0 };
					fs.writeFileSync(user_file, JSON.stringify(json_data, null, 2));
					message.reply("signed you up for the game successfully!");
				//}
			}
		} catch (err) {
			console.error(err);
		}
	}
	
	else if (cmd == "battle")
	{
		try
		{
			if (fs.existsSync(user_file)) 
			{
				console.log("file " + user_file + " exists");
				
				var fp = fs.readFileSync(user_file);
				var json_data = JSON.parse(fp);
				
				if (json_data.curr_state == 1)
					message.reply("you're already in a battle!");
				else
				{
					json_data.curr_state = 1;
					message.reply("entering a battle!");
					fs.writeFile(user_file, JSON.stringify(json_data, null, 2), function writeJSON(err) {
						if (err) return console.log(err);
						console.log(JSON.stringify(json_data));
						console.log('writing to ' + user_file);
					});
				}
			}
			else
			{
				message.reply("you have not started the game. No fighting for you! ?startgame");
				console.log(user_file + ' does not exist, player has not started the game');
			}
		} catch (err) {
			console.error(err);
		}
	}
	
	else if (cmd == "playerstats")
	{
		try
		{
			if (fs.existsSync(user_file)) 
			{
				console.log("file " + user_file + " exists");
				
				var fp = fs.readFileSync(user_file);
				var json_data = JSON.parse(fp);
				
				const player_embed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(json_data.name)
					.setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/279595144893602396/1F91FBF9CC3CEDDC7246DE0982E9651E9849D646/')
					.addFields(
						{ name: 'HP', value: formatPlayerHpBar(json_data) },
						{ name: 'MP', value: formatPlayerMpBar(json_data) },
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Left-hand Weapon', value: 'null', inline: true },
						{ name: 'Right-hand Weapon', value: 'null', inline: true },
						{ name: 'Spell', value: 'null', inline: true }
					)
					.setTimestamp()
					.setFooter('bird bingus box battle blasphemy');
				
				message.channel.send(player_embed);
			}
			else
			{
				message.reply("you have not started the game. No stats for you! ?startgame");
				console.log(user_file + ' does not exist, player has not started the game');
			}
		} catch (err) {
			console.error(err);
		}
	}
}); 

client.login(config.BOT_TOKEN);
