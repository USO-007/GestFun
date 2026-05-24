import { useEffect, useState } from "react";
import { departmentService } from "../services/service";
import { employeeService } from "../services/service";

const EMPTY_FORM = {
   name: "", email: "", phone: "", address: "", role: "", status: true, departmentId: "",
};

export default function Employees() {
   const [employees, setEmployees] = useState([]);
   const [departments, setDepartments] = useState([]);
   const [loading, setLoading] = useState(true);
   const [showModal, setShowModal] = useState(false);
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
         const [emps, deps] = await Promise.all([
            employeeService.getAll(),
            departmentService.getAll(),
         ]);
         setEmployees(emps);
         setDepartments(deps);
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

   function openEdit(emp) {
      setEditing(emp.id);
      setForm({
         name: emp.name,
         email: emp.email,
         phone: emp.phone,
         address: emp.address,
         role: emp.role,
         status: emp.status,
         departmentId: departments.find((d) => d.name === emp.departmentName)?.id || "",
      });
      setError("");
      setShowModal(true);
   }

   function closeModal() {
      setShowModal(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      setError("");
   }

   //validation
   const validators = {
      name: value => value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""),

      phone: value => value.replace(/\D/g, "").slice(0, 9),

      email: value => value.trim(),

      address: value => value.trim(),

      role: value => value.trim(),

      status: value => value, // checkbox

      department: value => value // id do departamento
   };

   function handleChange(e) {
      const { name, value, type, checked } = e.target;

      let finalValue = type === "checkbox" ? checked : value;

      if (validators[name]) {
         finalValue = validators[name](finalValue);
      }

      setForm(prev => ({
         ...prev,
         [name]: finalValue
      }))
   }

   async function handleSubmit(e) {
      e.preventDefault();
      setSaving(true);
      setError("");
      try {
         const payload = { ...form, departmentId: form.departmentId || null };
         if (editing) {
            await employeeService.update(editing, payload);
         } else {
            await employeeService.create(payload);
         }
         await fetchData();
         closeModal();
      } catch (err) {
         setError(err?.response?.data?.error || "Erro ao guardar funcionário.");
      } finally {
         setSaving(false);
      }
   }

   async function handleDelete(id) {
      if (!confirm("Tens a certeza que queres eliminar este funcionário?")) return;
      try {
         await employeeService.delete(id);
         await fetchData();
      } catch {
         alert("Erro ao eliminar funcionário.");
      }
   }

   const filtered = employees.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="p-8">

         {/* Header */}
         <div className="flex items-center justify-between mb-8">
            <div>
               <h1 className="text-2xl font-bold text-slate-800">Funcionários</h1>
               <p className="text-slate-500 text-sm mt-1">{employees.length} funcionário(s) registado(s)</p>
            </div>
            <button
               onClick={openCreate}
               className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               Novo Funcionário
            </button>
         </div>

         {/* Search */}
         <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
            </svg>
            <input
               type="text"
               placeholder="Pesquisar por nome, email ou cargo..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent bg-white transition"
            />
         </div>

         {/* Table */}
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  <p className="text-sm">Nenhum funcionário encontrado</p>
               </div>
            ) : (
               <table className="w-full text-sm">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cargo</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Departamento</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-4" />
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {filtered.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50 transition">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {emp.name.charAt(0).toUpperCase()}
                                 </div>
                                 <div>
                                    <p className="font-medium text-slate-800">{emp.name}</p>
                                    <p className="text-xs text-slate-400">{emp.phone}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-slate-600">{emp.email}</td>
                           <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                           <td className="px-6 py-4">
                              {emp.departmentName ? (
                                 <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
                                    {emp.departmentName}
                                 </span>
                              ) : (
                                 <span className="text-slate-400 text-xs">—</span>
                              )}
                           </td>
                           <td className="px-6 py-4">
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${emp.status
                                 ? "bg-emerald-100 text-emerald-700"
                                 : "bg-red-100 text-red-600"
                                 }`}>
                                 {emp.status ? "Activo" : "Inactivo"}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2 justify-end">
                                 <button
                                    onClick={() => openEdit(emp)}
                                    className="text-slate-400 hover:text-blue-700 transition p-1"
                                    title="Editar"
                                 >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                 </button>
                                 <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="text-slate-400 hover:text-red-600 transition p-1"
                                    title="Eliminar"
                                 >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1H5" />
                                    </svg>
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-lg font-bold text-slate-800">
                        {editing ? "Editar Funcionário" : "Novo Funcionário"}
                     </h2>
                     <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nome</label>
                           <input name="name" value={form.name} onChange={handleChange} required placeholder="Nome completo"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                        </div>
                        <div className="col-span-2">
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                           <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@empresa.com"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Telefone</label>
                           <input name="phone" value={form.phone} onChange={handleChange} required placeholder="9xxxxxxxx"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Cargo</label>
                           <input name="role" value={form.role} onChange={handleChange} required placeholder="Ex: Desenvolvedor"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                        </div>
                        <div className="col-span-2">
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Endereço</label>
                           <input name="address" value={form.address} onChange={handleChange} required placeholder="Rua, número, cidade"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Departamento</label>
                           <select name="departmentId" value={form.departmentId} onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition bg-white">
                              <option value="">Sem departamento</option>
                              {departments.map((d) => (
                                 <option key={d.id} value={d.id}>{d.name}</option>
                              ))}
                           </select>
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                           <input type="checkbox" name="status" id="status" checked={form.status} onChange={handleChange}
                              className="w-4 h-4 accent-blue-900 rounded" />
                           <label htmlFor="status" className="text-sm text-slate-600 font-medium">Funcionário activo</label>
                        </div>
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
                           {saving ? "A guardar..." : editing ? "Guardar alterações" : "Criar funcionário"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}