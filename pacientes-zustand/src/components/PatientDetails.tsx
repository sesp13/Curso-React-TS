import { Patient } from '../types';
import { PatientDetailItem } from './PatientDetailItem';
import { toast } from 'react-toastify';
import { usePatientStore } from '../store';

type PatientDetailsProps = {
  patient: Patient;
};

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);

  const onDeletePatient = () => {
    deletePatient(patient.id);
    toast.error('Paciente eliminado correctamente');
  };

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="id" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />
      <PatientDetailItem label="Sintomas" data={patient.symptoms} />

      <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>
        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={onDeletePatient}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
