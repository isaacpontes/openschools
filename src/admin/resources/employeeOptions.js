module.exports = {
  navigation: {
    name: 'Recursos Humanos',
    icon: 'Events'
  },
  properties: {
    admission_date: {
      type: 'date'
    },
    birthday: {
      type: 'date'
    },
    situation: {
      availableValues: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Cedido', label: 'Cedido' },
        { value: 'Extraclasse', label: 'Extraclasse' },
        { value: 'Licenciado', label: 'Licenciado' },
        { value: 'Permutado', label: 'Permutado' },
        { value: 'Professor Regente', label: 'Professor Regente' },
        { value: 'Readaptado', label: 'Readaptado' },
      ]
    },
    bond: {
      availableValues: [
        { value: 'Efetivo', label: 'Efetivo' },
        { value: 'Contratado', label: 'Contratado' },
        { value: 'Comissionado', label: 'Comissionado' },
        { value: 'Cedido', label: 'Cedido' },
        { value: 'Permutado', label: 'Permutado' }
      ]
    },
    shift: {
      availableValues: [
        { value: 'morning', label: 'Manhã' },
        { value: 'afternoon', label: 'Tarde' },
        { value: 'night', label: 'Noite' },
        { value: 'morning-afternoon', label: 'Manhã e Tarde' },
        { value: 'afternoon-night', label: 'Tarde e Noite' },
        { value: 'morning-night', label: 'Manhã e Noite' },
      ]
    },
  },
  editProperties: [
    'name',
    'employee_code',
    'email',
    'phone',
    'address',
    'birthday',
    'situation',
    'origin_sector_id',
    'current_sector_id',
    'position',
    'role',
    'bond',
    'cpf',
    'rg',
    'ctps',
    'elector_title',
    'pis',
    'fundeb',
    'admission_date',
    'formation',
    'complementary_formation',
    'workload',
    'shift',
    'info'
  ],
  filterProperties: [
    'employee_code',
    'name',
    'email',
    'phone',
    'address',
    'birthday',
    'situation',
    'origin_sector_id',
    'current_sector_id',
    'position',
    'role',
    'bond',
    'cpf',
    'rg',
    'ctps',
    'elector_title',
    'pis',
    'fundeb',
    'admission_date',
    'formation',
    'complementary_formation',
    'workload',
    'shift',
    'info'
  ],
  listProperties: [
    'id',
    'employee_code',
    'name',
    'email',
    'phone',
    'bond',
    'current_sector_id'
  ],
  showProperties: [
    'id',
    'name',
    'employee_code',
    'email',
    'phone',
    'address',
    'birthday',
    'situation',
    'origin_sector_id',
    'current_sector_id',
    'position',
    'role',
    'bond',
    'cpf',
    'rg',
    'ctps',
    'elector_title',
    'pis',
    'fundeb',
    'admission_date',
    'formation',
    'complementary_formation',
    'workload',
    'shift',
    'info',
    'created_at',
    'updated_at'
  ]
};
