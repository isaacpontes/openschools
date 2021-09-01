class GradesController {
  constructor (service) {
    this.service = service;
  }

  // Render a list of all grades
  // GET /grades
  index = async (req, res) => {
    const newGrade = this.service.create();

    try {
      const grades = await this.service.findAll();
      return res.render('admin/grades/index', { grades, newGrade });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Save a new grade to the database
  // POST /grades
  save = async (req, res) => {
    const { name } = req.body.grade;
    const grade = this.service.create(name);

    try {
      await this.service.save(grade);
      req.flash('success', 'Ano escolar salvo com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      req.flash('error', 'Erro ao salvar ano escolar.');
      return res.redirect('/admin/grades');
    }
  }

  // Update a grade in the database
  // PUT /grades/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body.grade;

    try {
      await this.service.updateOne(id, name);
      req.flash('success', 'Ano escolar atualizado com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar ano escolar.');
      return res.redirect(`/admin/grades/${id}/edit`);
    }
  }

  // Delete grade from database
  // DELETE /grades/:id
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await this.service.deleteOne(id);
      req.flash('success', 'Ano escolar excluído com sucesso.');
      return res.redirect('/admin/grades');
    } catch (error) {
      req.flash('error', 'Erro ao excluir ano escolar.');
      return res.redirect('/admin/grades');
    }
  }
}

module.exports = GradesController;
