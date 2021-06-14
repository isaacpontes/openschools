const gradesService = require('../../services/grades-service');

module.exports = {
  // Render a list of all grades
  // GET /grades
  index: async function (req, res) {
    const newGrade = gradesService.create();
    try {
      const grades = await gradesService.findAll();
      return res.status(200).render('admin/grades/index', { grades, newGrade });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  },

  // Save a new grade to the database
  // POST /grades
  save: async function (req, res) {
    const { name } = req.body.grade;
    const grade = gradesService.create(name);
    try {
      await gradesService.save(grade);
      req.flash('success', 'Ano escolar salvo com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      req.flash('error', 'Erro ao salvar ano escolar.');
      return res.redirect('/admin/grades');
    }
  },

  // Update a grade in the database
  // PUT /grades/:id
  update: async function (req, res) {
    const id = req.params.id;
    const { name } = req.body.grade;
    try {
      await gradesService.updateOne(id, name);
      req.flash('success', 'Ano escolar atualizado com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar ano escolar.');
      return res.redirect('/admin/grades');
    }
  },

  // Delete grade from database
  // DELETE /grades/:id
  delete: async function (req, res) {
    const { id } = req.params;
    try {
      await gradesService.deleteOne(id);
      req.flash('success', 'Ano escolar excluído com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      return res.redirect('/admin/grades');
    }
  }
};
