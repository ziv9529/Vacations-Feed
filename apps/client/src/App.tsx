import React from 'react';
import { VacationsPage } from './components/pages/vacationsPage/vacations';
import { Container, Typography } from "@mui/material";



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppHeader } from './components/app-components/header';
import { AppNavBar } from './components/app-components/navbar';
import { AppRoutes } from './components/app-components/appRoutes';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppHeader />
        <AppNavBar />
        <AppRoutes />
      </Container>
    </BrowserRouter>
  )
}

export default App;
