const SectorService = require('../../services/SectorService');

class SectorsController {
  // Render a list of all sectors
  // GET /sectors
  index = async (req, res) => {
    try {
      const sectors = await SectorService.findAll();
      return res.render('admin/sectors/index', { sectors });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Save a new sector to the database
  // POST /sectors
  save = async (req, res) => {
    const { name } = req.body.sector;
    const sector = SectorService.create(name);

    try {
      await SectorService.save(sector);
      req.flash('success', 'Setor salvo com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      req.flash('error', 'Erro ao salvar setor.');
      return res.redirect('/admin/sectors/create');
    }
  }

  // Render the create sector form
  // GET /sectors/create
  create = async (req, res) => {
    const sector = SectorService.create();
    return res.render('admin/sectors/create', { sector });
  }

  // Render sector edit form
  // GET /sectors/:id/edit
  edit = async (req, res) => {
    const { id } = req.params;
    try {
      const sector = await SectorService.findById(id);
      return res.render('admin/sectors/edit', { sector });
    } catch (error) {
      return res.render('pages/error', { error });
    }
  }

  // Update a sector in the database
  // PUT /sectors/:id
  update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body.sector;
    try {
      await SectorService.updateOneOne(id, name);
      req.flash('success', 'Setor atualizado com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      req.flash('error', 'Erro ao atualizar setor.');
      return res.redirect(`/admin/sectors/${id}/edit`);
    }
  }

  // Delete sector from database
  // DELETE /sectors/:id
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await SectorService.deleteOneOne(id);
      req.flash('success', 'Setor excluído com sucesso.');
      return res.redirect('/admin/sectors');
    } catch (error) {
      req.flash('error', 'Erro ao excluir setor.');
      return res.redirect('/admin/sectors');
    }
  }
}

module.exports = SectorsController;
