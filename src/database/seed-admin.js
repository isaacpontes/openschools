const readline = require('readline');
const UserService = require('../services/UserService');

async function seedAdmin() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => new Promise(resolve => rl.question(query, answer => resolve(answer)));

  const createAdmin = await askQuestion('Do you want to create a new Admin user? [y/n] ');

  if (createAdmin !== 'y') {
    return false;
  }

  let valid = false;

  while (!valid) {
    const adminEmail = await askQuestion('\nEnter an email for the Admin user: ');
    const adminPassword = await askQuestion('\nEnter a password for the Admin user: ');

    try {

      const user = await UserService.create('Admin', 'admin', adminEmail, adminPassword);
      await UserService.save(user);

      console.log(`\nAdmin user with email '${user.email}' created successfully.\n`);
      valid = true;

    } catch (err) {

      console.log(err.message + '\nPlease, try again.\n');
      valid = false;

    }
  }
}

module.exports = seedAdmin;
