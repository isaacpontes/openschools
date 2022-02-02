module.exports = {
  navigation: 'Gestão Escolar',
  properties: {
    availableValues: [
      { value: 'active', label: 'Ativa' },
      { value: 'pending', label: 'Pendente' },
      { value: 'rejected', label: 'Recusada' },
      { value: 'inactive', label: 'Inativa' }
    ]
  },
  editProperties: ['status', 'student_id', 'classroom_id', 'academic_year_id'],
  filterProperties: ['status', 'student_id', 'classroom_id', 'academic_year_id' ],
  listProperties: ['id', 'status', 'student_id', 'classroom_id', 'academic_year_id', 'created_at'],
  showProperties: ['id', 'status', 'student_id', 'classroom_id', 'academic_year_id', 'created_at', 'updated_at']
}
