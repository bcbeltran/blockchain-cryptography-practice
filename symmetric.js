const CryptoJS = require('crypto-js');
const { randomBytes, scrypt, createHmac } = require('crypto');

function symmetricEncrypt(message, password) {
    const salt = randomBytes(32);
    const iv = randomBytes(16);
	scrypt(password, salt, 64, (err, key) => {
        const encryptKey = key.slice(0, 256).toString('hex');
		const hmacKey = key.slice(256).toString('hex');
        
        var encryptedMessage = CryptoJS.AES.encrypt(message, encryptKey, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv
        });

        let mac = createHmac("sha256", hmacKey).update(message).digest("hex");

        const scrypt = {
            dklen: key.length,
            salt: salt.toString('hex'),
            n: 16384,
            r: 16,
            p: 1
        };
        const aes = encryptedMessage.key.toString();
        const hexIv = iv.toString('hex');

        const finalOutput = JSON.stringify({scrypt, aes, hexIv, mac});
        
        symmetricDecrypt(finalOutput, "p@$$w0rd~3");
	});
}

function symmetricDecrypt(encrypted, password) {

    const decrypt = JSON.parse(encrypted);
    
    scrypt(password, decrypt.scrypt.salt, 64, (err, key) => {
        const encryptKey = key.slice(0, 256).toString("hex");
		const hmacKey = key.slice(256).toString("hex");
        
        let mac = createHmac("sha256", hmacKey).update(decrypt.aes).digest("hex");
        
        var decryptedMessage = CryptoJS.AES.decrypt(decrypt.aes, encryptKey, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: decrypt.hexIv,
        });

        console.log("decrypt hmac, ", mac);
        console.log("encrypt hmac, ", decrypt.mac);
        console.log(decryptedMessage.words);
    });
    
}

symmetricEncrypt("exercise-cryptography", "p@$$w0rd~3");