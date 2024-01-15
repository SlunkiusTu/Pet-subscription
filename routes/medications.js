import express from "express";
const router = express.Router();

import {
  GET_ALL_MEDICATIONS,
  ADD_MEDICATION,
} from "../controller/medications.js";

router.get("/v1/meds", GET_ALL_MEDICATIONS);

router.post("/v1/meds", ADD_MEDICATION);

export default router;
