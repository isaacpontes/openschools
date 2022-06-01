module.exports = {
  navigation: {
    name: 'Administração',
    icon: 'Settings'
  },
  properties: {
    password: {
      type: 'password'
    },
    role: {
      availableValues: [
        { value: 'admin', label: 'Administrador' },
        { value: 'manager', label: 'Gestor' },
        { value: 'teacher', label: 'Professor' },
        { value: 'student', label: 'Estudante' }
      ]
    }
  },
  editProperties: [
    'name',
    'email',
    'password',
    'role'
  ],
  filterProperties: [
    'name',
    'email',
    'role',
    'created_at',
    'updated_at'
  ],
  listProperties: [
    'id',
    'name',
    'email',
    'role'
  ],
  showProperties: [
    'id',
    'name',
    'lastName',
    'phone',
    'birth',
    'email',
    'role',
    'avatar',
    'created_at',
    'updated_at'
  ]
};
