import { Header } from '../components/Header';
import Modal from '../components/Modal';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto py-16'>
        <Outlet />
      </div>
      <Modal />
    </>
  );
};
