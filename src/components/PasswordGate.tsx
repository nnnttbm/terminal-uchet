import React, { useState } from 'react';
import { Lock, Unlock, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CORRECT_PASSWORD = 'Peremoha2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (password === CORRECT_PASSWORD) {
      setSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess();
      }, 1250); // Small duration to let the user see the gorgeous green visual success banner.
    } else {
      setTimeout(() => {
        setError('Введен неверный код доступа. Доступ к терминалам заблокирован!');
        setIsSubmitting(false);
      }, 350);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 font-sans selection:bg-slate-800">
      {/* Decorative premium radial gradients background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Top Lock/Shield Visual Representation */}
          <div className="text-center space-y-3">
            <div className="inline-flex relative">
              <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                success 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 rotate-12 scale-110' 
                  : error 
                    ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 animate-bounce' 
                    : 'bg-blue-600/10 border-slate-800 text-blue-400'
              }`}>
                {success ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
              </div>
              <span className={`absolute -top-1 -right-1 flex h-3 w-3 ${success ? 'hidden' : ''}`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-lg font-black tracking-wider text-white uppercase font-mono">
                Перемога
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Терминалы сбора данных • Распределительный центр
              </p>
            </div>
          </div>

          {/* Correct Security Status Message Banner */}
          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl flex items-center space-x-3 shadow-lg shadow-emerald-500/5 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs font-bold leading-normal">
                Успешный вход! Снятие блокировки системы...
              </div>
            </div>
          )}

          {/* Error Status Message Banner */}
          {error && !success && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl flex items-center space-x-3 shadow-lg shadow-rose-500/5 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <div className="text-xs font-semibold leading-normal">
                {error}
              </div>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Пароль доступа
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    disabled={isSubmitting}
                    className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-700 bg-slate-950/40 text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? 'Проверка...' : 'Разблокировать систему'}
              </motion.button>
            </form>
          )}

          {/* Security Alert Label Warning */}
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-medium">
              Доступ разрешен только авторизованным сотрудникам склада РЦ.
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
