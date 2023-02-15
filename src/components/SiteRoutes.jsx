import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "../layout/ProtectedLayout";
import CsvImporter from "../pages/csv/CsvImporter";
import Home from "../pages/home/Home";
import Auth from "./Auth";

const SiteRoutes = () => {
  return (
    <HashRouter>
      <Routes>
       <Route path="/" element={<ProtectedLayout />}>
           <Route index element={<Home />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="/csv" element={<CsvImporter />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default SiteRoutes;
