import { Header } from '../components/Header';
import Modal from '../components/Modal';
import { Notification } from '../components/Notification';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';

export const Layout = () => {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-16">
        <Outlet />
      </div>
      <Modal />
      <Notification />
    </>
  );
};
