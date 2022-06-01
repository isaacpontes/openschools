module.exports = {
  navigation: {
    name: 'Gestão Escolar',
    icon: 'Education'
  },
  properties: {
    gender: {
      availableValues: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' }
      ]
    },
    birthday: {
      type: 'date'
    },
    blood_type: {
      availableValues: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
      ]
    }
  },
  editProperties: [
    'student_code',
    'first_name',
    'last_name',
    'gender',
    'phone',
    'address',
    'birthday',
    'birth_place',
    'father_name',
    'father_ocupation',
    'mother_name',
    'mother_ocupation',
    'blood_type',
    'transport_id',
    'info'
  ],
  filterProperties: [
    'student_code',
    'first_name',
    'last_name',
    'gender',
    'phone',
    'address',
    'birthday',
    'birth_place',
    'father_name',
    'father_ocupation',
    'mother_name',
    'mother_ocupation',
    'blood_type',
    'transport_id',
    'info'
  ],
  listProperties: [
    'id',
    'student_code',
    'first_name',
    'last_name',
    'gender',
    'phone'
  ],
  showProperties: [
    'id',
    'student_code',
    'first_name',
    'last_name',
    'gender',
    'phone',
    'address',
    'birthday',
    'birth_place',
    'father_name',
    'father_ocupation',
    'mother_name',
    'mother_ocupation',
    'blood_type',
    'transport_id',
    'info',
    'created_at',
    'updated_at'
  ]
};
