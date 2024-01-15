import db from "../db.js";

const GET_ALL_PETS = async (req, res) => {
  try {
    const pets = await db.query("SELECT * from pets WHERE isarchived=false");
    return res.json({ pets: pets.rows });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_PET = async (req, res) => {
  try {
    const pet = await db.query(`INSERT INTO public.pets(
      name, dob, client_email, isarchived)
      VALUES ('${req.body.name}', '${req.body.dob}', '${req.body.client_email}', ${req.body.isarchived})`);
    return res.status(201).json({ response: "Pet was added", pet: pet });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const DELETE_PET = async (req, res) => {
  try {
    const pet = await db.query(`DELETE from pets WHERE id=${req.params.id} `);
    return res.json({ response: pet, status: "Pet was removed" });
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_ALL_PETS, ADD_PET, DELETE_PET };
