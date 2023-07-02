import { pool } from "../db.js";

//Obtener empleados
export const getEmployes = async (req, res) => {
  try {
    // throw new error("bb error");Podemos verificar el error habilitanesto esto
    const [rows] = await pool.query("SELECT * FROM employes");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Obtener empleados por id
export const getEmploye = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employes WHERE id = ?", [
      req.params.id, //Este en el valor queva obtener el ? en la consulta a bd
    ]);

    // Recordar que la propiedad lenght me devuelve cuantos elementos tiene
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Insertar empleados
export const createEmployes = async (req, res) => {
  const { name, salary } = req.body; //validar req.body
  try {
    const [rows] = await pool.query(
      "INSERT INTO employes (name,salary) VALUES (?,?)",
      [name, salary]
    );
    //Con esta linea de condigo indicamos que solo quiero recirbir el id,elname y el salary del objeto,si dejo ROWS me devolvera un objeto inmenso.
    res.send({
      id: rows.insertId,
      name,
      salary,
      //rows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Eliminar empleados
export const deleteEmployes = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM  employes WHERE id = ?", [
      req.params.id,
    ]);

    //Si el empleado no existe enviar un codigo 404
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employe no found",
      });
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployes = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      // "UPDATE employes SET name = ?, salary = ? WHERE id = ?", Consulta para put
      "UPDATE employes SET name = IFNULL(?,name), salary = IFNULL (?,salary) WHERE id = ?",
      [name, salary, id]
    ); //Consulta para Pacht

    //Si el empleado no existe enviar un codigo 404
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employed no found",
      });

    const rows = await pool.query("SELECT * FROM employes WHERE id = ?", [id]);

    console.log(result);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
