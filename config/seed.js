const readline = require('readline');
const User = require('../models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => {
    rl.question(query, answer => resolve(answer));
  });
}

async function createValidUser() {
  let valid = false;

  while (!valid) {
    const adminEmail = await askQuestion('\nEnter an email for the Admin user: ');
    const adminPassword = await askQuestion('\nEnter a password for the Admin user: ');
  
    const user = new User({
      name: 'Admin',
      role: 'admin',
      email: adminEmail,
      password: adminPassword
    });

    await user.save()
      .then(() => {
        console.log('\nAdmin user created successfully.');
        valid = true;
      })
      .catch((err) => {
        console.log(err.message + '\nPlease, try again.');
        valid = false;
      });
  }
}

async function seedAdmin(users) {
  const usersDocumentCount = await users.countDocuments();
  if (usersDocumentCount > 0) return false;

  console.log('\nIt looks like your users collection is empty.');
  const createAdmin = await askQuestion('Do you want to create a new Admin user? [y/n] ');
  if (createAdmin !== 'y') return false;

  createValidUser();
}

module.exports = seedAdmin;
