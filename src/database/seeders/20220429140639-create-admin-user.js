'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT id FROM users WHERE role=\'admin\';');

    if (users.length > 0) {
      console.log('Usuário administrador já cadastrado');
      return;
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        role: 'admin',
        email: 'admin@email.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DELETE FROM users WHERE email=\'admin@email.com\' AND role=\'admin\';');
  }
};
