const { createHmac } = require("crypto");

function hash(string, key) {
	let hmac = createHmac('sha256', key).update(string).digest('hex');
    return console.log('this is the hash key, ' + key + '\n' + 'this is the hmac, ' + hmac);
}

hash("eat more pizza", "today");