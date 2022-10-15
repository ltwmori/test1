import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Page404 } from './pages/404';

import { Home } from './pages/Home';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={'/home'} element={<Home />} />
      </Route>
      <Route path="/patient" element={<Page404 />} />
      <Route path="/doctor" element={<Page404 />} />
      <Route path="/partner" element={<Page404 />} />
      <Route path="/employee" element={<Page404 />} />
    </Routes>
  );
};
