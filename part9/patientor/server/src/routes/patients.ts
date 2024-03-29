import express from "express";

import patientService from "../services/patientService";

import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensetiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getEntry(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.getEntry(req.params.id);

    if (!patient) {
      throw new Error("Bad id");
    }

    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
