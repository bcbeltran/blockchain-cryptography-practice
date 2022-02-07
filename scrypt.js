const {scrypt, createHash} = require('crypto');

function output(){

    scrypt(
		"p@$$w0rD~3",
		"string",
        32,
		{
			cost: 16384,
			blockSize: 8,
			parallelization: 1,
		},
		(err, key) => {
			if (err) return console.log(err);
            let hashedKey = createHash("sha256").update(key).digest("hex");

			return console.log(hashedKey);
		}
	);
} 

output();