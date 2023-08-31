import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Search from './Pages/Search';
import SearchResult from './Pages/SearchResult';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/:terms" element={<SearchResult />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;