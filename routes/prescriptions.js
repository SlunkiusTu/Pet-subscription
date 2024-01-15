import express from "express";
const router = express.Router();

import {
  GET_PRESCRIPTIONS_FOR_PET,
  ADD_PRESCRIPTION,
} from "../controller/prescriptions.js";

router.get("/v1/prescriptions/:petId", GET_PRESCRIPTIONS_FOR_PET);

router.post("/v1/prescriptions", ADD_PRESCRIPTION);

export default router;
