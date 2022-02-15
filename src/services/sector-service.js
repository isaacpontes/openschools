const { QueryTypes } = require('sequelize');
const Sector = require('../models/Sector');

module.exports = {
  create: (name) => {
    const sector = Sector.build({ name });
    return sector;
  },

  findAll: async () => {
    const sectors = await Sector.findAll();
    return sectors;
  },

  findById: async (id) => {
    const sector = await Sector.findByPk(id);
    return sector;
  },

  save: async (sector) => {
    await sector.save();
    return sector;
  },

  updateOne: async (id, name) => {
    await Sector.update({ name }, { where: { id } });
  },

  deleteOne: async (id) => {
    await Sector.destroy({ where: { id } });
  },

  getEmployeesCountBySector: async () => {
    const sectors = await Sector.sequelize.query(`
      SELECT
        "Sector".id,
        "Sector".name,
        COUNT("Employee".current_sector_id) AS "count"
      FROM
        "sectors" AS "Sector"
        LEFT JOIN "employees" AS "Employee"
          ON "Employee".current_sector_id = "Sector".id
      GROUP BY
        "Sector".id;
    `, {
      type: QueryTypes.SELECT
    });

    const total = sectors.reduce((accum, current) => accum + Number(current.count), 0);

    return { quantities: sectors, total };
  }
}
