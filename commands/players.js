const axios = require("axios");
const xml = require("xml-parse");
const Discord = require('discord.js');
const { blacklist_lookup } = require('./blacklist.json');

// list of different links for the different servers.
const jb_api_link = 'https://prestigegaming.gameme.com/api/serverinfo/74.91.113.83:27015/players';
const minigames_api_link = 'https://prestigegaming.gameme.com/api/serverinfo/64.74.97.39:27015/players';
const TTT_api_link = 'https://prestigegaming.gameme.com/api/serverinfo/74.91.113.113:27015/players';
const surf_api_link = 'https://prestigegaming.gameme.com/api/serverinfo/66.85.14.237:27015/players';
const bhop_api_link = 'https://prestigegaming.gameme.com/api/serverinfo/74.91.124.34:27015/players';
let link = "";
let split_T = true;

module.exports = {
	name: 'players',
	description: 'This shows current players on a eGO servers. (default jailbreak)',
	aliases: ['player', 'server'],
	usage: 'players [jb, mg, TTT, surf, bhop]',
	cooldown: 50,
	execute(message, args) {

		// server arg select
		if (!args.length || args[0].toLowerCase() === 'jb') {link = jb_api_link;}
		else if (args[0].toLowerCase() === 'ttt') {link = TTT_api_link;}
		else if (args[0].toLowerCase() === 'mg') {
			link = minigames_api_link;
			split_T = false;
		}
		else if (args[0].toLowerCase() === 'surf') {
			link = surf_api_link;
			split_T = false;
		}
		else if (args[0].toLowerCase() === 'bhop') {
			link = bhop_api_link;
			split_T = false;
		}

		// scrape the website to get xml string
		async function scrapewebsite() {
			const scrape = await axios.get(link);
			return scrape.data;
		}
		(async ()=>{
			const scrape = await scrapewebsite();

			// parse xml for playerlist
			const xmlDoc = new xml.DOM(xml.parse(scrape));
			const player_list = xmlDoc.document.getElementsByTagName("player");

			// make different running lists needed for embed
			let name = "";
			let T_list_1 = "";
			let T_list_2 = "";
			let CT_list = "";
			let SPEC_list = "";
			let blacklist = "";

			// get map from xml
			const map = xmlDoc.document.getElementsByTagName("map");

			// loop through each player and get their name and team
			for (let i = 0; i < player_list.length; i++) {
				const playerDoc = new xml.DOM(xml.parse(player_list[i].innerXML));
				name = playerDoc.document.getElementsByTagName("name");
				let team = playerDoc.document.getElementsByTagName("team");

				// clean up names (idk if this is needed, but it fixxed a issue early on)
				team = team[0].innerXML.replace("<![CDATA[", "").replace("]]>", "");
				name = name[0].innerXML.replace("<![CDATA[", "").replace("]]>", "");

				// sort players based on teams into their different lists also split T's into 2 lists
				if (team === "TERRORIST" && i % 2 == 0) {T_list_1 = T_list_1.concat(name, '\n');}
				else if (team === "TERRORIST" && i % 2 == 1 && split_T == true) {T_list_2 = T_list_2.concat(name, '\n');}
				else if (team === "TERRORIST" && split_T == false) {T_list_1 = T_list_1.concat(name, '\n');}
				else if (team === "CT") {CT_list = CT_list.concat(name, '\n');}
				else if (team === "Spectator") {SPEC_list = SPEC_list.concat(name, '\n');}
			}

			// loop through each blacklisted id and check if it is anywhere in the responce then if it is lookup the name from the blacklist_name array and add the name to the list
			for (let i = 1; i < blacklist_lookup.length; i += 2) {
				if (scrape.includes(blacklist_lookup[i]) === true) {
					blacklist = blacklist.concat(blacklist_lookup[i - 1], '\n');
				}
			}

			// Make embed and only add each section if there is somthing to display
			const Player_result = new Discord.MessageEmbed().setColor('#0099ff').setTitle('Players').setFooter("Map: " + map[0].innerXML);
			if (T_list_1.length) {
				Player_result.addFields({ name: "**Terrorists: **", value: T_list_1, inline: true });
			}
			if (T_list_2.length) {
				Player_result.addFields({ name: ".", value: T_list_2, inline: true });
			}
			if (CT_list.length) {
				Player_result.addFields({ name: "**Counter Terrorists: **", value: CT_list, inline: true });
			}
			if (SPEC_list.length) {
				Player_result.addFields({ name: "**Spectators: **", value: SPEC_list, inline: true });
			}
			if (blacklist.length) {
				Player_result.addFields({ name: "**Blacklist: **", value: blacklist, inline: true });
			}

			// send message with results
			message.channel.send(Player_result);
		})();
	},
};