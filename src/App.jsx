import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUp from './Components/SignInSignUp';
import ProtectedRoute from './Components/ProtectedRoute';
import AuthProvider from './Components/AuthContext';
import PostManager from './Components/postmanager';



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route
            path="/crud"
            element={
              <ProtectedRoute>
                <PostManager/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
