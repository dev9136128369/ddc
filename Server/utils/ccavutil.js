// const crypto = require('crypto');

// const encrypt = (plainText, workingKey) => {
//   try {
//     const iv = Buffer.from('0000000000000000', 'utf8');
//     const key = crypto.createHash('md5').update(workingKey).digest('hex').substr(0, 16);
//     // const key = crypto.createHash('md5').update(workingKey).digest('hex').substring(0, 16);
//     const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    
//     let encrypted = cipher.update(plainText, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
    
//     return encrypted;
//   } catch (error) {
//     console.error('Encryption error:', error);
//     throw new Error('Encryption failed');
//   }
// };

// const decrypt = (encryptedText, workingKey) => {
//   try {
//     const iv = Buffer.from('0000000000000000', 'utf8');
//     const key = crypto.createHash('md5').update(workingKey).digest('hex').substr(0, 16);
//     const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
    
//     return decrypted;
//   } catch (error) {
//     console.error('Decryption error:', error);
//     throw new Error('Decryption failed');
//   }
// };

// module.exports = { encrypt, decrypt };













const crypto = require('crypto');

const encrypt = (plainText, workingKey) => {
  const key = crypto.createHash('md5').update(workingKey).digest('hex').substring(0, 16);
  const iv = Buffer.from('0000000000000000', 'utf8');
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText, workingKey) => {
  const key = crypto.createHash('md5').update(workingKey).digest('hex').substring(0, 16);
  const iv = Buffer.from('0000000000000000', 'utf8');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
