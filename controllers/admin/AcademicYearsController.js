const Controller = require('../Controller');

class AcademicYearsController extends Controller {
  // Render a list of all academic years
  // GET /academic-years
  index = async (req, res) => {
    const newAcademicYear = this.service.create();

    try {
      const academicYears = await this.service.findAll();
      return res.render('admin/academic-years/index', { academicYears, newAcademicYear });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Save a new academic year to the database
  // POST /academic-years
  save = async (req, res) => {
    const { year } = req.body.academicYear;
    const academicYear = this.service.create(year);

    try {
      await this.service.save(academicYear);
      req.flash('success', 'Ano letivo salvo com sucesso.');
      return res.redirect('/admin/academic-years');
    } catch (error) {
      req.flash('error', 'Erro ao salvar ano letivo.');
      return res.redirect('/admin/academic-years');
    }
  }

  // Update a academic year in the database
  // PUT /academic-years/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { year } = req.body.academicYear;

    try {
      await this.service.updateOne(id, year);
      req.flash('success', 'Ano letivo atualizado com sucesso.');
      return res.redirect('/admin/academic-years');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar ano letivo.');
      return res.redirect(`/admin/academic-years/${id}/edit`);
    }
  }

  // Delete academic year from database
  // DELETE /academic-years/:id
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await this.service.deleteOne(id);
      req.flash('success', 'Ano letivo excluído com sucesso.');
      return res.redirect('/admin/academic-years');
    } catch (error) {
      req.flash('error', 'Erro ao excluir ano letivo.');
      return res.redirect('/admin/academic-years');
    }
  }
}

module.exports = AcademicYearsController;
