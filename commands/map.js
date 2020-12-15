const axios = require("axios");
const Discord = require('discord.js');

function pad_with_zeroes(number, length) {

	let my_string = '' + number;
	while (my_string.length < length) {
		my_string = '0' + my_string;
	}

	return my_string;

}

function unix_timeleft(x) {
	let dif = (Math.round((new Date()).getTime() / 1000)) - x - 1600000000 ;
	dif = 2100 - dif;
	if (dif > 0) {
		return(pad_with_zeroes(Math.floor(dif / 60), 2) + ':' + pad_with_zeroes((dif % 60), 2));
	}
	else {
		return('lastround');
	}
}


module.exports = {
	name: 'map',
	description: 'This shows current map for jailbreak.',
	execute(message) {
		async function scrapewebsite() {
			const scrape = await axios.get('http://prestigegaming.gameme.com/api/serverinfo/74.91.113.83:27015/status');
			return scrape.data;
		}
		(async ()=>{
			const scrape = await scrapewebsite();
			if (scrape.lastIndexOf("<error>") >= 1) {
				console.log(scrape);
				message.channel.send('Error see console for reason.');
				return('');
			}
			const map_name = scrape.substring(
				scrape.lastIndexOf("<map>") + 5,
				scrape.lastIndexOf("</map>"),
			);
			const map_unix = scrape.substring(
				scrape.lastIndexOf("<time>") + 8,
				scrape.lastIndexOf("</time>"),
			);
			const player_count = scrape.substring(
				scrape.lastIndexOf("<act>") + 5,
				scrape.lastIndexOf("</act>"),
			);
			const people_map_time = unix_timeleft(map_unix);
			const map_message = new Discord.MessageEmbed()
				.addFields(
					{ name: '**Map:**', value: map_name, inline: true },
					{ name: '**Timeleft:**', value: people_map_time, inline: true },
					{ name: '**Playercount:**', value: player_count, inline: true },
				);
			message.channel.send(map_message);
		})();
	},
};