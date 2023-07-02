import { pool } from "../db.js";

export const ping = async (req, res) => {
  //[resul]=para que solo me muestre el resultado y no me arroje el resto del arreglo
  const [result] = await pool.query('SELECT "pong" AS result');

  //[0] para que solo muestre esto:
  //   {
  //   "result": 4
  // }
  res.json(result[0]);
  // res.send("pong");
};
