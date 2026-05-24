import { useState } from "react";
import { authService } from "../services/service";

export default function Login({ onLogin }) {
   const [form, setForm] = useState({ username: "", password: "" });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setError("");
   };

   const handleSubmit = async (e) => {

      e.preventDefault();
      setLoading(true);
      try {
         const data = await authService.login(form.username, form.password);
         if (data.message === "LOGIN_SUCCESS") {
            onLogin();
         } else {
            setError("Credenciais inválidas.");
         }
      } catch {
         setError("Credenciais inválidas.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
         <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-10">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
               </div>
               <h1 className="text-3xl font-bold text-slate-800 tracking-tight">GestFun Application</h1>
               <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-medium">An Enterprise app</p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
               <h2 className="text-xl font-semibold text-slate-700 mb-6">Acesso ao sistema</h2>

               <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Username */}
                  <div>
                     <label className="block text-sm font-medium text-slate-600 mb-1">
                        Utilizador
                     </label>
                     <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Digite o seu utilizador"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                     />
                  </div>

                  {/* Password */}
                  <div>
                     <label className="block text-sm font-medium text-slate-600 mb-1">
                        Palavra-passe
                     </label>
                     <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
                     />
                  </div>

                  {/* Erro */}
                  {error && (
                     <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                        </svg>
                        {error}
                     </div>
                  )}

                  {/* Botão */}
                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition shadow-md hover:shadow-lg"
                  >
                     {loading ? (
                        <span className="flex items-center justify-center gap-2">
                           <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                           </svg>
                           A entrar...
                        </span>
                     ) : "Entrar"}
                  </button>
               </form>
            </div>

            {/* Direitos autorais reservado aos integrantes do grupo*/}
            <p className="text-center text-xs text-slate-400 mt-6">
               © 2026 Adão_Amélia_Américo_Anjo_António
            </p>
         </div>
      </div>
   );
}


