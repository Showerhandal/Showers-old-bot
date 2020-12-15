const rp = require('request-promise');
const Discord = require('discord.js');

const request_btc = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_last_updated_at=true',
	json: true,
	gzip: true,
};

const request_doge = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd&include_last_updated_at=true',
	json: true,
	gzip: true,
};

const request_litecoin = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd&include_last_updated_at=true',
	json: true,
	gzip: true,
};

const request_ethereum = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_last_updated_at=true',
	json: true,
};

const request_bitcoincash = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd&include_last_updated_at=true',
	json: true,
};

const request_all = {
	method: 'GET',
	uri: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,litecoin,dogecoin,bitcoin&vs_currencies=usd&include_last_updated_at=true',
	json: true,
};

module.exports = {
	name: 'crypto',
	description: 'This shows current crypto prices and can check transactions.',
	aliases: ['c', 'price'],
	usage: '[btc/doge/ltc/eth/bch/check]',
	args: true,
	execute(message, args) {
		if (args[0].toLowerCase() === 'bitcoin' || args[0].toLowerCase() === 'btc') {
			rp(request_btc).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setAuthor('Bitcoin Price')
					.setTitle(response.bitcoin.usd + " USD");
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error:`, err.message);
			});
		}

		else if (args[0].toLowerCase() === 'dogecoin' || args[0].toLowerCase() === 'doge') {
			rp(request_doge).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setAuthor('Dogecoin Price')
					.setTitle(response.dogecoin.usd + " USD");
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error`, err.message);
			});
		}

		else if (args[0].toLowerCase() === 'litecoin' || args[0].toLowerCase() === 'ltc' || args[0].toLowerCase() === 'lite') {
			rp(request_litecoin).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setAuthor('Litecoin Price')
					.setTitle(response.litecoin.usd + " USD");
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error`, err.message);
			});
		}

		else if (args[0].toLowerCase() === 'all' || args[0].toLowerCase() === 'prices') {
			rp(request_all).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setTitle('Crypto Prices')
					.addFields(
						{ name: '**Bitcoin**', value: (response.bitcoin.usd + " USD"), inline: true },
						{ name: '**Dogecoin**', value: (response.dogecoin.usd + " USD"), inline: true },
						{ name: '**Litecoin**', value: (response.litecoin.usd + " USD"), inline: true },
						{ name: '**Ethereum**', value: (response.ethereum.usd + " USD"), inline: true },
					);
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error`, err.message);
			});
		}

		else if (args[0].toLowerCase() === 'ethereum' || args[0].toLowerCase() === 'eth') {
			rp(request_ethereum).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setAuthor('Ethereum Price')
					.setTitle(response.ethereum.usd + " USD");
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error`, err.message);
			});
		}

		else if (args[0].toLowerCase() === 'bitcoincash' || args[0].toLowerCase() === 'bch') {
			rp(request_bitcoincash).then(response => {
				const crypto_results = new Discord.MessageEmbed()
					.setColor('#ff9900')
					.setAuthor('Bitcoincash Price')
					.setTitle(response["bitcoin-cash"].usd + " USD");
				message.channel.send(crypto_results);
			}).catch((err) => {
				message.channel.send(`API call error`, err.message);
			});
		}
	},
};
