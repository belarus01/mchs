import React, { useRef, useState } from 'react';
//import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import UserAdminPage from './pages/UserAdminPage';
import DepartmentsPage from './pages/DepartmentsPage';
import StrDepartmentsPage from './pages/StrDepartmentsPage';
import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import GeolocationService from './services/geolocation.service';
import { GeolocationData } from './shared/interfaces';
import { getCurrentUser } from './services/auth.service';
import { ConfigProvider } from 'antd';

function App() {
  
  return (
   
      <AppRouter />
   
  );
}

export default App;
