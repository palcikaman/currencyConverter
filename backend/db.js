const { Pool } = require("pg");

const pool = new Pool({
  database: "currency_converter",
  user: "postgres",
  password: "changeme",
  host: "converter_db",
});
pool.connect();

async function getSymbols() {
  try {
    const {rows: symbols} = await pool.query("SELECT code FROM symbols")
    return symbols;
  } catch (e) {
    console.error(e)
  }
}

async function getChangeRate({from, to}) {
  try {
    const {rows: change_rates} = await pool.query({
      text: "SELECT * FROM change_rates WHERE from_code = $1 AND to_code = $2",
      values: [from, to]
    })
    return change_rates[0];
  } catch (e) {
    console.error(e)
  }
}

async function createChangeRate({from, to, rate}) {
  try {
    const {rows: change_rates} = await pool.query({
      text: "INSERT INTO change_rates (id, from_code, to_code, rate) VALUES (DEFAULT, $1, $2, $3) RETURNING *;",
      values: [from, to, rate]
    })
    return change_rates[0];
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getSymbols,
  getChangeRate,
  createChangeRate
}