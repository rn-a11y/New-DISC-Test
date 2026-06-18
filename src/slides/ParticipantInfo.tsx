import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { useAssessment } from '../context/AssessmentContext';
import { User, Hash, Building2, Briefcase, Calendar } from 'lucide-react';
import React from 'react';

export function ParticipantInfo() {
  const { state, dispatch } = useAssessment();
  const { participant } = state;

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_PARTICIPANT', payload: { ...participant, [field]: value } });
  };

  const fields: { icon: React.ReactNode; label: string; field: string; placeholder?: string; type?: string }[] = [
    { icon: <User className="w-4 h-4" />, label: 'Nama Lengkap', field: 'name', placeholder: 'Masukkan nama lengkap' },
    { icon: <Hash className="w-4 h-4" />, label: 'ID Karyawan', field: 'employeeId', placeholder: 'Masukkan ID karyawan' },
    { icon: <Building2 className="w-4 h-4" />, label: 'Departemen', field: 'department', placeholder: 'Masukkan departemen' },
    { icon: <Briefcase className="w-4 h-4" />, label: 'Jabatan', field: 'position', placeholder: 'Masukkan jabatan' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Tanggal Asesmen', field: 'date', type: 'date' },
  ];

  const isValid = participant.name.length > 0 && participant.department.length > 0;

  return (
    <SlideContainer className="flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-2xl min-w-0 shrink-0 py-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/5 rounded-full text-xs font-semibold text-navy/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-navy/40" />
              DATA PESERTA
            </div>
            <h2 className="text-4xl font-bold text-navy">Informasi Peserta</h2>
            <p className="text-slate-400 mt-2">Lengkapi data diri Anda sebelum memulai asesmen</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 card-hover">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(({ icon, label, field, placeholder, type }) => (
                <div key={field} className={field === 'name' ? 'md:col-span-2' : ''}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                    <span className="text-navy/50">{icon}</span>
                    {label}
                  </label>
                  <input
                    type={type || 'text'}
                    value={(participant as any)[field] || ''}
                    onChange={(e) => update(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-navy/30 focus:ring-2 focus:ring-navy/10 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl shrink-0">
          <Navigation disableNext={!isValid} />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
