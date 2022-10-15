import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Page404 } from './pages/404';

import { Home } from './pages/Home';
import { Patient } from './pages/Patient';
import { Survey } from './pages/Survey';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={'/home'} element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/doctor" element={<Page404 />} />
        <Route path="/partner" element={<Page404 />} />
        <Route path="/employee" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
