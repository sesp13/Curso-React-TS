import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FavoritesPage } from './views/FavoritesPage';
import { IndexPage } from './views/IndexPage';
import { Layout } from './layouts/Layout';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
