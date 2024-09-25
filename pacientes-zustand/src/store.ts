import { DraftPatient, Patient } from './types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type PatientState = {
  patients: Patient[];
  activeId: Patient['id'];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient['id']) => void;
  getPatientById: (id: Patient['id']) => void;
  updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => ({
  ...patient,
  id: uuidv4(),
});

export const usePatientStore = create<PatientState>(
  devtools(
    persist((set, get) => ({
      // Initial State
      patients: [],
      activeId: '',
      // End Initial State
      // Actions
      addPatient: (data: DraftPatient) => {
        const newPatient = createPatient(data);
        set((state) => ({
          patients: [...state.patients, newPatient],
        }));
      },
      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        }));
      },
      getPatientById: (id) => {
        set(() => ({ activeId: id }));
      },
      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map((patient) => {
            if (patient.id === state.activeId) {
              return { id: state.activeId, ...data };
            } else {
              return patient;
            }
          }),
          activeId: '',
        }));
      },
      // End Actions
    })),
    {
      name: 'patient-storage',
    }
  )
);
