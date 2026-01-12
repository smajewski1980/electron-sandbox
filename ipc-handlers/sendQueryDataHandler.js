const pool = require("../dbConnect");

async function sendQueryDataHandler(e, data) {
  const format = data.format;
  const field = data.field;
  const term = data.term + "%";
  const queryText = `select * from ${format} where ${field} like $1 order by id;`;

  try {
    const result = await pool.query(queryText, [term]);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendQueryDataHandler };
