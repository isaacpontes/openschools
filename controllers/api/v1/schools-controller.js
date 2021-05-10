const Classroom = require('../../../models/classroom');
const School = require('../../../models/school');

module.exports = {
  // Return a list of all schools belonging to current user
  // GET /api/v1/schools
  findAuthUserSchools: async function (req, res) {
    const authenticatedUser = req.user._id;

    try {
      const schools = await School.find({ manager: authenticatedUser }).populate('manager', 'name');
      return res.status(200).json(schools);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar lista de escolas.' });
    }
  },

  // Return a single school with it's classrooms
  // GET /api/v1/schools/:id
  findSchoolById: async function (req, res) {
    const { id } = req.params;

    try {
      const school = await School.findById(id).populate('manager', 'name');

      // Check if the authenticated user is the manager
      if (!school.manager._id.equals(req.user._id))
        return res.status(401).json({ message: 'Você não tem acesso a esta escola.'});

      const classrooms = await Classroom.find({ school: school._id });
  
      return res.status(200).json({ school, classrooms });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  },
};
