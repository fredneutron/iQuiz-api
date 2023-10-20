const mongoose = require('mongoose');
const dbname = 'iquiz';
const dbport = '27017';
const host = '127.0.0.1';


async function main() {
  await mongoose.connect(`mongodb://${host}:${dbport}/${dbname}`)
  await mongoose.connection.on('connection', () => console.log('connected'))
  await mongoose.connection.on('error', err => console.log(err));
}

main().catch(err => console.log(err));

module.exports = mongoose;