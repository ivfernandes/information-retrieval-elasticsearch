import React from 'react';
import { Router, Route, Navigate } from 'react-router-dom';
import Main from './Pages/Main';

function App() {
  return (
    <Router>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Router>
  );
}

export default App;