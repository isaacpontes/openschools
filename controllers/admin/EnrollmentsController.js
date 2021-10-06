const Controller = require('../Controller');

class EnrollmentsController extends Controller {
  // Render a list of all enrollments
  // GET /admin/enrollments
  index = async (req, res) => {
    try {
      const enrollments = await this.service.findAll();
      return res.render('admin/enrollments/index', { enrollments });
    } catch (error) {
      return res.status(400).render('pages/error', { error });
    }
  }

}

module.exports = EnrollmentsController;
