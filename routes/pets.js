import express from "express";
const router = express.Router();

import { GET_ALL_PETS, ADD_PET, DELETE_PET } from "../controller/pets.js";

router.get("/v1/pets", GET_ALL_PETS);

router.post("/v1/pets", ADD_PET);

router.delete("/v1/pets/:id", DELETE_PET);

export default router;
