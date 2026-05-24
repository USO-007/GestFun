import { useEffect, useState } from "react";
import { departmentService } from "../services/service";
import { employeeService } from "../services/service";

const EMPTY_FORM = { name: "", description: "" };

export default function Departments() {
   const [departments, setDepartments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [showEmployeesModal, setShowEmployeesModal] = useState(false);
   const [selectedDept, setSelectedDept] = useState(null);
   const [deptEmployees, setDeptEmployees] = useState([]);
   const [editing, setEditing] = useState(null);
   const [form, setForm] = useState(EMPTY_FORM);
   const [search, setSearch] = useState("");
   const [error, setError] = useState("");
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      fetchData();
   }, []);

   async function fetchData() {
      setLoading(true);
      try {
         setDepartments(await departmentService.getAll());
      } finally {
         setLoading(false);
      }
   }

   function openCreate() {
      setEditing(null);
      setForm(EMPTY_FORM);
      setError("");
      setShowModal(true);
   }

   function openEdit(dept) {
      setEditing(dept.id);
      setForm({ name: dept.name, description: dept.description });
      setError("");
      setShowModal(true);
   }

   async function openEmployees(dept) {
      setSelectedDept(dept);
      setDeptEmployees([]);
      setShowEmployeesModal(true);
      try {
         setDeptEmployees(await departmentService.getEmployees(dept.id));
      } catch {
         setDeptEmployees([]);
      }
   }

   function closeModal() {
      setShowModal(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      setError("");
   }

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      setSaving(true);
      setError("");
      try {
         if (editing) {
            await departmentService.update(editing, form);
         } else {
            await departmentService.create(form);
         }
         await fetchData();
         closeModal();
      } catch (err) {
         setError(err?.response?.data?.error || "Erro ao guardar departamento.");
      } finally {
         setSaving(false);
      }
   }

   async function handleDelete(id) {
      if (!confirm("Tens a certeza que queres eliminar este departamento?")) return;
      try {
         await departmentService.delete(id);
         await fetchData();
      } catch {
         alert("Erro ao eliminar departamento.");
      }
   }

   const filtered = departments.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="p-8">

         {/* Header */}
         <div className="flex items-center justify-between mb-8">
            <div>
               <h1 className="text-2xl font-bold text-slate-800">Departamentos</h1>
               <p className="text-slate-500 text-sm mt-1">{departments.length} departamento(s) registado(s)</p>
            </div>
            <button
               onClick={openCreate}
               className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Novo Departamento
            </button>
         </div>

         {/* Search */}
         <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
            </svg>
            <input
               type="text"
               placeholder="Pesquisar departamento..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent bg-white transition"
            />
         </div>

         {/* Cards */}
         {loading ? (
            <div className="flex items-center justify-center h-48">
               <svg className="animate-spin w-8 h-8 text-blue-900" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
               </svg>
            </div>
         ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
               <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
               </svg>
               <p className="text-sm">Nenhum departamento encontrado</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
               {filtered.map((dept) => (
                  <div key={dept.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6">
                     <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 bg-slate-700 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
                           </svg>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={() => openEdit(dept)} className="text-slate-400 hover:text-blue-700 transition p-1" title="Editar">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                           </button>
                           <button onClick={() => handleDelete(dept.id)} className="text-slate-400 hover:text-red-600 transition p-1" title="Eliminar">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1H5" />
                              </svg>
                           </button>
                        </div>
                     </div>

                     <h3 className="font-bold text-slate-800 text-base mb-1">{dept.name}</h3>
                     <p className="text-slate-500 text-sm mb-4 line-clamp-2">{dept.description}</p>

                     <button
                        onClick={() => openEmployees(dept)}
                        className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-blue-900 border border-blue-200 hover:bg-blue-50 py-2 rounded-xl transition"
                     >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                        Ver funcionários
                     </button>
                  </div>
               ))}
            </div>
         )}

         {/* Modal criar/editar */}
         {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-lg font-bold text-slate-800">
                        {editing ? "Editar Departamento" : "Novo Departamento"}
                     </h2>
                     <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nome</label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Ex: Tecnologia"
                           className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Descrição</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Descreve o departamento..."
                           rows={3}
                           className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition resize-none" />
                     </div>

                     {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                           <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                           </svg>
                           {error}
                        </div>
                     )}

                     <div className="flex gap-3 pt-2">
                        <button type="button" onClick={closeModal}
                           className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                           Cancelar
                        </button>
                        <button type="submit" disabled={saving}
                           className="flex-1 bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                           {saving ? "A guardar..." : editing ? "Guardar alterações" : "Criar departamento"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Modal funcionários do departamento */}
         {showEmployeesModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                     <div>
                        <h2 className="text-lg font-bold text-slate-800">{selectedDept?.name}</h2>
                        <p className="text-slate-500 text-sm">{deptEmployees.length} funcionário(s)</p>
                     </div>
                     <button onClick={() => setShowEmployeesModal(false)} className="text-slate-400 hover:text-slate-600 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>

                  {deptEmployees.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                        <p className="text-sm">Nenhum funcionário neste departamento</p>
                     </div>
                  ) : (
                     <ul className="divide-y divide-slate-100">
                        {deptEmployees.map((emp) => (
                           <li key={emp.id} className="flex items-center gap-3 py-3">
                              <div className="w-9 h-9 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                 {emp.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                 <p className="text-sm font-medium text-slate-800">{emp.name}</p>
                                 <p className="text-xs text-slate-400">{emp.role}</p>
                              </div>
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${emp.status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                                 }`}>
                                 {emp.status ? "Activo" : "Inactivo"}
                              </span>
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}