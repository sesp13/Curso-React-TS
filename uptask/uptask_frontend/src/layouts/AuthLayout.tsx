import { Logo } from '@/components/Logo';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='py-10 lg:py-20 mx-auto w-[450px]'>
          <div className='w-64 mx-auto'>
          <Logo />
          </div>
          <div className='mt-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
