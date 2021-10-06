const { QueryTypes } = require('sequelize');
const Sector = require('../models/Sector');

class SectorService {
  create (name) {
    const sector = Sector.build({ name });
    return sector;
  }

  async findAll () {
    const sectors = await Sector.findAll();
    return sectors;
  }

  async findById (id) {
    const sector = await Sector.findByPk(id);
    return sector;
  }

  async save (sector) {
    await sector.save();
    return sector;
  }

  async updateOne (id, name) {
    await Sector.update({ name }, { where: { id } });
  }

  async deleteOne (id) {
    await Sector.destroy({ where: { id } });
  }

  async getEmployeesCountBySector () {
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

module.exports = SectorService;
