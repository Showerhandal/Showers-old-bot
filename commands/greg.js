module.exports = {
	name: 'greg',
	description: 'Greg name gen.',
	execute(message) {
		message.channel.send([(Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10))].join(''));
	},
};