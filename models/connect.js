const mongoose = require('mongoose');
const dbname = '';
const dbport = 27017;
const host = '127.0.0.1';


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${host}:${dbport}/${dbname}`);
}

module.exports = mongoose;