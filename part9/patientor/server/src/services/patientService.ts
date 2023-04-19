import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients";

import {
  PatientEntry,
  NonSensetivePatientEntry,
  NewPatientEntry,
} from "../types";

const getNonSensetiveEntries = (): NonSensetivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensetiveEntries,
  addPatient,
};
