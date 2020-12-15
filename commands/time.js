function pad_with_zeroes(number, length) {

	let my_string = '' + number;
	while (my_string.length < length) {
		my_string = '0' + my_string;
	}

	return my_string;

}

function cst_time() {
	const currentdate = new Date();
	let hour = currentdate.getHours();
	let hrtype = "AM";
	if (currentdate.getHours() > 12) {
		hour -= 12;
		hrtype = "PM";
	}
	const datetime = pad_with_zeroes(hour, 2) + ":"
                    + pad_with_zeroes(currentdate.getMinutes(), 2) + ":"
					+ pad_with_zeroes(currentdate.getSeconds(), 2) + ' '
					+ hrtype;
	return(datetime);
}

module.exports = {
	name: 'time',
	description: 'Shows the current time.',
	aliases: ['ping'],
	execute(message) {
		message.channel.send("The real time is: " + cst_time() + " no argument. All other times are not real.");
	},
};