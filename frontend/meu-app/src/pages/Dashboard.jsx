import { useEffect, useState } from "react";
import { departmentService } from "../services/service";
import { employeeService } from "../services/service";


export default function Dashboard({ onNavigate }) {
   const [stats, setStats] = useState({
      totalEmployees: 0,
      activeEmployees: 0,
      inactiveEmployees: 0,
      totalDepartments: 0,
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchStats() {
         try {
            const [employees, departments] = await Promise.all([
               employeeService.getAll(),
               departmentService.getAll(),
            ]);
            setStats({
               totalEmployees: employees.length,
               activeEmployees: employees.filter((e) => e.status).length,
               inactiveEmployees: employees.filter((e) => !e.status).length,
               totalDepartments: departments.length,
            });
         } finally {
            setLoading(false);
         }
      }
      fetchStats();
   }, []);

   const cards = [
      {
         label: "Total de Funcionários",
         value: stats.totalEmployees,
         icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
         ),
         color: "bg-blue-900",
         page: "employees",
      },
      {
         label: "Funcionários Activos",
         value: stats.activeEmployees,
         icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         ),
         color: "bg-emerald-700",
         page: "employees",
      },
      {
         label: "Funcionários Inactivos",
         value: stats.inactiveEmployees,
         icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         ),
         color: "bg-red-700",
         page: "employees",
      },
      {
         label: "Departamentos",
         value: stats.totalDepartments,
         icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
            </svg>
         ),
         color: "bg-slate-700",
         page: "departments",
      },
   ];

   return (
      <div className="p-8">
         <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Visão geral do sistema</p>
         </div>

         {loading ? (
            <div className="flex items-center justify-center h-48">
               <svg className="animate-spin w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
               </svg>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
               {cards.map((card) => (
                  <button
                     key={card.label}
                     onClick={() => onNavigate(card.page)}
                     className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 text-left group"
                  >
                     <div className={`inline-flex items-center justify-center w-12 h-12 ${card.color} text-white rounded-xl mb-4 group-hover:scale-105 transition-transform`}>
                        {card.icon}
                     </div>
                     <p className="text-3xl font-bold text-slate-800">{card.value}</p>
                     <p className="text-sm text-slate-500 mt-1">{card.label}</p>
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}