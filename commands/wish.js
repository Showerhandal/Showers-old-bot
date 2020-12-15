const Discord = require('discord.js');

function isEmpty(obj) {
	for(const prop in obj) {
		if(obj.hasOwnProperty(prop)) {return false;}
	}

	return true;
}

module.exports = {
	name: 'wish',
	description: 'Genshin impact wish simulator',
	usage: '[amount] (Max is 999,999)',
	execute(message, args) {
		let wishes_total = 0;
		if (isEmpty(args) === true) {
			wishes_total = 1;
		}
		else if (args[0].length > 6) {
			return message.channel.send("You could never afford that many, unless u got some big bucks.");
		}
		else if (args[0].length > 0) {
			wishes_total = Number(args[0]);
		}
		let five_star_character_count = 0;
		let five_star_item_count = 0;
		let four_star_character_count = 0;
		let four_star_item_count = 0;
		let three_star_item_count = 0;
		for (let wishes_rolled = 1; wishes_rolled <= wishes_total; wishes_rolled++) {
			const wish_probability = Math.random();
			if (wish_probability < 0.003) {
				five_star_character_count += 1;
			}
			else if (wish_probability < 0.006) {
				five_star_item_count += 1;
			}
			else if (wish_probability < 0.0315) {
				four_star_character_count += 1;
			}
			else if (wish_probability < 0.057) {
				four_star_item_count += 1;
			}
			else{
				three_star_item_count += 1;
			}
		}
		const wish_results = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Wish sim')
			.addFields(
				{ name: '5 Star character(s): ', value: five_star_character_count, inline: true },
				{ name: '5 Star items(s):', value: five_star_item_count, inline: true },
				{ name: '4 Star character(s):', value: four_star_character_count, inline: true },
				{ name: '4 star item(s)', value: four_star_item_count, inline: true },
				{ name: '3 Star item(s):', value: three_star_item_count, inline: true },
			);
		message.channel.send(wish_results);
	},
};