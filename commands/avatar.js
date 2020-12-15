const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Gets avatar link for you or others.',
	usage: '[user(s)]',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(new Discord.MessageEmbed()
				.setColor('#000000FF')
				.setTitle('Your avatar:')
				.setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}` + `?size=1024`));
		}
		const avatarList = message.mentions.users.map(user => {
			return (new Discord.MessageEmbed()
				.setColor('#000000FF ')
				.setTitle(`${user.username}'s avatar: `)
				.setImage(`${user.displayAvatarURL({ format: "png", dynamic: true })}` + `?size=1024`));
		});
		message.channel.send(avatarList);
	},
};