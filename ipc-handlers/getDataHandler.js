const pool = require("../dbConnect");

async function getDataHandler(e, idToGet) {
  const result = await pool.query(
    "select * from records order by id desc limit 5",
  );
  return result.rows;
}

module.exports = { getDataHandler };
