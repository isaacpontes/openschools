const SchoolService = require('../../services/SchoolService');
const UserService = require('../../services/UserService');

class SchoolsController {
  // Render a list of all schools
  // GET /admin/schools
  index = async (req, res) => {
    try {
      const schools = await SchoolService.findAll();
      return res.status(200).render('admin/schools/index', { schools });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

  // Save a new school to the database
  // POST /admin/schools
  save = async (req, res) => {
    const { name, inep_code, address, user_id } = req.body.school;
    const school = SchoolService.create(name, inep_code, address, user_id);

    try {
      await SchoolService.save(school);
      req.flash('success', 'Escola salva com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', `Erro ao salvar escola. ${error.message}`);
      return res.redirect('/admin/schools/create');
    }
  }

  // Render the create school form
  // GET /admin/schools/create
  create = async (req, res) => {
    try {
      const school = SchoolService.create();

      const allManagers = await UserService.findAllManagers();

      return res.render('admin/schools/create', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render a single school
  // GET /admin/schools/:id
  show = async (req, res) => {
    const { id } = req.params;
    try {
      const school = await SchoolService.findByIdWithClassrooms(id);
      console.log(school)
      return res.render('admin/schools/show', { school });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Render the edit school form
  // GET /admin/schools/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const school = await SchoolService.findById(id);

      const allManagers = await UserService.findAllManagers();

      return res.render('admin/schools/edit', { school, allManagers });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Updates a school in the database
  // PUT /admin/schools/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name, inep_code, address, user_id } = req.body.school;

    try {
      const school = await SchoolService.findById(id);

      if (name) {
        school.name = name;
      }
      if (inep_code) {
        school.inep_code = inep_code;
      }
      if (address) {
        school.address = address;
      }
      if (user_id) {
        school.user_id = user_id;
      }

      await SchoolService.save(school);

      req.flash('success', 'Escola atualizada com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar escola.');
      return res.redirect(`/admin/schools/${id}/edit`);
    }
  }

  // Delete a school from the database
  // DELETE /admin/schools/:id
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await SchoolService.deleteOne(id);
      req.flash('success', 'Escola excluída com sucesso.');
      return res.redirect('/admin/schools');
    } catch (error) {
      req.flash('error', 'Erro ao excluir escola.');
      return res.redirect('/admin/schools');
    }
  }
}

module.exports = SchoolsController;
