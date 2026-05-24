export default function Navbar({ page, onNavigate, onLogout }) {
   const links = [
      { key: "dashboard", label: "Dashboard" },
      { key: "employees", label: "Funcionários" },
      { key: "departments", label: "Departamentos" },
   ];

   return (
      <nav className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
               </svg>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">GestFun</span>
         </div>

         <div className="flex items-center gap-1">
            {links.map((link) => (
               <button
                  key={link.key}
                  onClick={() => onNavigate(link.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page === link.key
                     ? "bg-white text-blue-900"
                     : "text-white/70 hover:text-white hover:bg-white/10"
                     }`}
               >
                  {link.label}
               </button>
            ))}
         </div>

         <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
         >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Sair
         </button>
      </nav>
   );
}