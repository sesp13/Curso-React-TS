type PatientDetailItemProps = {
  label: string;
  data: string;
}

export const PatientDetailItem = ({label, data}: PatientDetailItemProps) => {
  return (
    <p className="font-bold mb-3 text-gray uppercase">
      {label}: <span className="font-normal normal-case">{data}</span>
    </p>
  );
};
