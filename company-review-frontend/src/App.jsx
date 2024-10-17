import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitySelector from "./components/CitySelector";
import CompanyList from "./components/Companies/CompanyList";
import Header from "./components/header/Header";
import CompanyDetails from "./components/Companies/CompanyDetails";

import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="flex flex-col items-center w-full gap-[88px] mt-[40px]">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CitySelector />
                  <CompanyList />
                </>
              }
            />

            <Route path="/companies/:id" element={<CompanyDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
