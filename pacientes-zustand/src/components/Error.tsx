import { ReactNode } from 'react';

type ErrorProps = {
  children: ReactNode;
};

export const Error = ({ children }: ErrorProps) => {
  return (
    <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">
      {children}
    </p>
  );
};
