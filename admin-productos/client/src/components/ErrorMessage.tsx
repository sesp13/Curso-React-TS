import { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="my-4 text-center bg-red-600 text-white font-bold p-3 uppercase">
      {children}
    </div>
  );
};
