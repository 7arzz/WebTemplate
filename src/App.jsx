import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Generator from './pages/Generator';
import PublishedSite from './pages/PublishedSite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/:slug" element={<PublishedSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
