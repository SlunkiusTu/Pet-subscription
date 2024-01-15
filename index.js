import express from "express";
import cors from "cors";
import "dotenv/config";
import petsRouter from "./routes/pets.js";
import medicationsRouter from "./routes/medications.js";
import logsRouter from "./routes/logs.js";
import prescriptionsRouter from "./routes/prescriptions.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(petsRouter);
app.use(medicationsRouter);
app.use(logsRouter);
app.use(prescriptionsRouter);
// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App started on port ${process.env.PORT}`);
});
