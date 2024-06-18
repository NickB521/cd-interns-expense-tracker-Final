import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseRequestForm from "./components/Forms/ExpenseRequestForm";
import EntryPoint from "./components/Entry/EntryPoint";
import MyContext from "./FireBase/MyContext";
import Profile from "./components/Profile";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Archived from "./components/Tables/Archived";
import NavbarC from "./components/Utilities/NavbarC";
import ReviewApproveTable from "./components/Tables/ReviewApproveTable";
import PurchaseTracker from "./components/Tables/PurchaseTracker";

const Sandbox = () => {
  const [cookies, setCookies, updateCookies] = useCookies();
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <MyContext.Provider value={{ cookies, setCookies, updateCookies }}>
      
        <BrowserRouter>
        <NavbarC admin={admin} setAdmin={setAdmin} />
          <Routes>
            <Route exact path="/" element={<EntryPoint />} />
            <Route path="/home" element={admin ? <ReviewApproveTable /> : <PurchaseTracker />} />
            <Route path="/request" element={<ExpenseRequestForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/archive" element={<Archived />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default Sandbox;
