const Grade = require('../../models/grade');

module.exports = {
  // Render a list of all grades
  // GET /grades
  index: async function (req, res) {
    const newGrade = new Grade();
    try {
      const grades = await Grade.find({});
      return res.status(200).render('admin/grades/index', { grades, newGrade });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Save a new grade to the database
  // POST /grades
  save: async function (req, res) {
    const { name } = req.body.grade;
    const grade = new Grade({ name });
  
    try {
      await grade.save();
      req.flash('success', 'Ano escolar salvo com sucesso.');
      return res.status(201).redirect('/admin/grades');
    } catch (error) {
      return res.status(400).redirect('/admin/grades', { error: 'Erro ao salvar ano escolar.' });
    }
  },

  // Update a grade in the database
  // PUT /grades/:id
  update: async function (req, res) {
    const id = req.params.id;
    const { name } = req.body.grade;
  
    try {
      await Grade.findByIdAndUpdate(id, { name });
  
      req.flash('success', 'Ano escolar atualizado com sucesso.');
      return res.status(200).redirect('/admin/grades');
    } catch (error) {
      return res.status(400).redirect('/admin/grades', { grade: { name }, error: 'Erro ao atualizar ano escolar.' });
    }
  },

  // Delete grade from database
  // DELETE /grades/:id
  delete: async function (req, res) {
    const id = req.params.id;
  
    try {
      await Grade.findByIdAndRemove(id);
  
      req.flash('success', 'Ano escolar excluído com sucesso.');
      return res.status(200).redirect('/admin/grades');
    } catch (error) {
      return res.status(400).redirect('/admin/grades', { error: 'Erro ao excluir ano escolar.' });
    }
  }
};
