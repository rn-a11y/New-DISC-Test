import { motion } from 'framer-motion';
import { ClipboardList, BarChart3, PieChart, UserCheck, ArrowRight } from 'lucide-react';

const steps = [
  { icon: ClipboardList, label: 'Kuesioner', desc: '24 kelompok pernyataan' },
  { icon: BarChart3, label: 'Skor Mentah', desc: 'Most & Least per dimensi' },
  { icon: PieChart, label: 'Skor Standar', desc: 'Normalisasi D, I, S, C' },
  { icon: UserCheck, label: 'Profil Akhir', desc: '40 pola kepribadian' },
];

export function ScoringFlow() {
  return (
    <div className="relative">
      <div className="hidden md:grid grid-cols-4 gap-3 relative">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative z-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-5 text-center card-hover"
          >
            <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-navy/10">
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="font-bold text-navy text-sm">{step.label}</h3>
            </div>
            <p className="text-xs text-slate-400">{step.desc}</p>
          </motion.div>
        ))}
        <div className="absolute top-7 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-slate-200 -z-0" />
      </div>
      <div className="md:hidden space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-slate-100 p-4"
          >
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
              <step.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">0{i + 1}</span>
                <h3 className="font-bold text-navy text-sm">{step.label}</h3>
              </div>
              <p className="text-xs text-slate-400">{step.desc}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
