import db from "../db.js";

const GET_ALL_MEDICATIONS = async (req, res) => {
  try {
    const medications = await db.query("SELECT * from medications");
    return res.json({ medications: medications.rows });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_MEDICATION = async (req, res) => {
  try {
    const { name, description } = req.body;

    const query = `
      INSERT INTO public.medications (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [name, description];

    const newMedication = await db.query(query, values);

    res.status(201).json({
      response: "Medication was added",
      medication: newMedication.rows[0],
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_ALL_MEDICATIONS, ADD_MEDICATION };
