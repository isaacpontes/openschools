const Classroom = require('../../../models/classroom');
const School = require('../../../models/school');

module.exports = {
  // // Return a list of all schools belonging to current user
  // // GET /api/v1/schools
  // index: async function (req, res) {
  //   const currentUser = req.user._id;

  //   try {
  //     const schools = await School.find({ manager: currentUser });
  //     res.status(200).json(schools);
  //   } catch (error) {
  //     res.status(400).json({ message: 'Erro ao recuperar lista de escolas.' });
  //   }
  // },

  // Return a single school with it's classrooms
  // GET /api/v1/schools/:id
  show: async function (req, res) {
    const { id } = req.params;

    try {
      const school = await School.findById(id).populate({
        path: 'manager',
        select: ['_id', 'name', 'role', 'email']
      });
      const classrooms = await Classroom.find({ school: school._id });
  
      res.status(200).json({ school, classrooms });
    } catch (error) {
      res.status(400).json({ message: 'Erro ao recuperar escola.' });
    }
  },
};
