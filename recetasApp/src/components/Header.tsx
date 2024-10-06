import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className="bg-slate-800 ">
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" className="w-32" alt="Logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={'/favoritos'}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
