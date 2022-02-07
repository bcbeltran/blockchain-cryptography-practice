const { createHash } = require('crypto');

function hash(string) {
    let hash = createHash('sha256').update(string).digest('hex');
    return console.log(hash);
}

hash('blahblahblah');