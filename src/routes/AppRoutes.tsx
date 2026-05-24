import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CompanyDetails from "../pages/CompanyDetails";
import AddReview from "../pages/AddReview";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/company/:id" element={<CompanyDetails />} />

        <Route path="/review/:id" element={<AddReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
