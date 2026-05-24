import { useState } from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Departments from "../pages/Departments";
import Navbar from "../components/Navbar"

export default function App() {
   const [loggedIn, setLoggedIn] = useState(false);
   const [page, setPage] = useState("dashboard");

   if (!loggedIn) {
      return <Login onLogin={() => setLoggedIn(true)} />;
   }

   return (
      <div className="min-h-screen bg-slate-100">
         <Navbar page={page} onNavigate={setPage} onLogout={() => setLoggedIn(false)} />
         <main>
            {page === "dashboard" && <Dashboard onNavigate={setPage} />}
            {page === "employees" && <Employees />}
            {page === "departments" && <Departments />}
         </main>
      </div>
   );
}