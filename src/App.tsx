import React from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import CharacterList from "./containers/CharacterList/CharacterList";
import Header from "./components/Header";
import CharacterDetails from "./containers/CharacterDetail/CharacterDetails";
import "./App.css";

function Layout() {
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "60px calc(100vh - 60px)" }}>
      <Header />
      <Outlet />
    </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CharacterList />} />
        <Route path="character/:characterId" element={<CharacterDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
