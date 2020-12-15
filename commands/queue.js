const { current_queue, current_queue_mention } = require('./queue.json');


//	I need to change it so only one array is used and it enders the mention then the username so I can just referance the same array,
//	this is so the arrays dont go out of sync and it would look cleaner. something like current_queue.push(username,username_mention)
//	then you would remove it with index current_queue.splice(remove_index, 2) or somthin however the 2nd variable works in the spilce
//	function works.

module.exports = {
	name: 'queue',
	description: "Adds players to a queue. ```If it breaks just use clear to fix it.```",
	usage: '[add/remove/next/clear] [@username]',
	aliases: ['q'],
	execute(message, args) {
		let queue_list = JSON.stringify(current_queue);
		if (!args.length) {
			return message.channel.send('The current queue is:' + queue_list);
		}
		else if (args[0].toLowerCase() === 'add') {
			current_queue_mention.push(args[1]);
			const taggedUser = message.mentions.users.first();
			current_queue.push(taggedUser.username);
			queue_list = JSON.stringify(current_queue);
			message.channel.send(args[1] + ' was added to the queue.\nThe current queue is:' + queue_list);
		}
		else if (args[0].toLowerCase() === 'next') {
			const next_player = current_queue_mention[0];
			current_queue_mention.shift();
			current_queue.shift();
			queue_list = JSON.stringify(current_queue);
			message.channel.send('The queue has been moved up one space.\nThe current queue is:' + queue_list + '\n' + next_player + ' it is now your turn to play/join.');
		}
		else if (args[0].toLowerCase() === 'remove') {
			const remove_index = current_queue_mention.indexOf(args[1]);
			if (remove_index > -1) {
				current_queue.splice(remove_index, 1);
				current_queue_mention.splice(remove_index, 1);
				queue_list = JSON.stringify(current_queue);
				message.channel.send(args[1] + ' was removed from the queue.\nThe current queue is:' + queue_list);
			}
			else{
				message.channel.send('I can not find a player in queue by that name.\nThe current queue is:' + queue_list);
			}
		}
		else if (args[0].toLowerCase() === 'clear') {
			current_queue.length = 0;
			current_queue_mention.length = 0;
			message.channel.send('The queue has been cleared');
		}
	},
};