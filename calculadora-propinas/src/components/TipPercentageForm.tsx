import { Dispatch, SetStateAction } from 'react';

type TipPercentageFormProps = {
  setTip: Dispatch<SetStateAction<number>>;
  tip: number;
};

export const TipPercentageForm = ({ setTip, tip }: TipPercentageFormProps) => {
  const tipOptions = [
    {
      id: 'tip-10',
      value: 0.1,
      label: '10%',
    },
    {
      id: 'tip-20',
      value: 0.2,
      label: '20%',
    },
    {
      id: 'tip-50',
      value: 0.5,
      label: '50%',
    },
  ];

  return (
    <div>
      <h3 className="font-black text-2xl">Propina: </h3>
      <form>
        {tipOptions.map((tipOption) => (
          <div className="flex gap-2" key={tipOption.id}>
            <label htmlFor="">{tipOption.label}</label>
            <input
              type="radio"
              id={tipOption.id}
              name="tipOption"
              value={tipOption.value}
              onChange={(e) => setTip(+e.target.value)}
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
};
