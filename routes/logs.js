import express from "express";
const router = express.Router();

import { GET_PETS_AND_LOGS, ADD_LOGS } from "../controller/logs.js";

router.get("/v1/logs/:petId", GET_PETS_AND_LOGS);

router.post("/v1/logs", ADD_LOGS);

export default router;
