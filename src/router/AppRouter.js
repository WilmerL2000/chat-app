import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { Register, Home, Login } from '../pages';
import { PrivateRoute, PublicRoute } from './';
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default AppRouter;
