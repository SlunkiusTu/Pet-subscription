import db from "../db.js";

const ADD_PRESCRIPTION = async (req, res) => {
  try {
    const { pet_id, medication_id, comment } = req.body;

    const query = `
      INSERT INTO public.prescriptions (pet_id, medication_id, comment, timestamp)
      VALUES ($1, $2, $3, now())
      RETURNING *;
    `;
    const values = [pet_id, medication_id, comment];

    const newPrescription = await db.query(query, values);

    res.status(201).json({
      response: "A new record has been added to prescriptions.",
      prescription: newPrescription.rows[0],
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const GET_PRESCRIPTIONS_FOR_PET = async (req, res) => {
  try {
    const petId = req.params.petId;

    const query = `
      SELECT p.name AS pet_name, m.name AS medication_name, pr.comment, pr.timestamp
      FROM public.prescriptions pr
      JOIN public.pets p ON pr.pet_id = p.id
      JOIN public.medications m ON pr.medication_id = m.id
      WHERE pr.pet_id = $1;
    `;
    const result = await db.query(query, [petId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { ADD_PRESCRIPTION, GET_PRESCRIPTIONS_FOR_PET };
