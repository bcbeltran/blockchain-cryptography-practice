const { createHash } = require("crypto");

function hash(string) {
	let hash = createHash("ripemd160").update(string).digest("hex");
	return console.log(hash);
}

hash("blahblahblah");
