import db from "../db.js";

const GET_PETS_AND_LOGS = async (req, res) => {
  try {
    const petId = req.params.petId;
    const query = `
    SELECT p.id, p.name, p.dob, p.client_email, p.isarchived, l.description, l.status
    FROM public.pets p
    LEFT JOIN public.logs l ON p.id = l.pet_id
    WHERE p.id = $1
    `;

    const result = await db.query(query, [petId]);
    console.log();
    return res.json({ petAndLogs: result.rows });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_LOGS = async (req, res) => {
  try {
    const { pet_id, description, status } = req.body;

    const query = `
      INSERT INTO public.logs (pet_id, description, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [pet_id, description, status];

    const newLog = await db.query(query, values);

    res
      .status(201)
      .json({ response: "Record has been added", log: newLog.rows[0] });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_PETS_AND_LOGS, ADD_LOGS };
