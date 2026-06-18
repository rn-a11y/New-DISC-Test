import type { DiscProfileDetails } from '../../data/types';
import { CheckCircle2, AlertTriangle, Briefcase, MessageCircle, Users, Target } from 'lucide-react';

interface ProfileCardProps {
  profile: DiscProfileDetails;
  color: string;
}

export function ProfileCard({ profile, color }: ProfileCardProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <CheckCircle2 className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Karakteristik</h3>
          </div>
          <ul className="space-y-2">
            {profile.characteristics.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <Target className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Kekuatan</h3>
          </div>
          <ul className="space-y-2">
            {profile.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <AlertTriangle className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Pengembangan</h3>
          </div>
          <ul className="space-y-2">
            {profile.challenges.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <Briefcase className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Preferensi Kerja</h3>
          </div>
          <ul className="space-y-2">
            {profile.workplacePreferences.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <MessageCircle className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Gaya Komunikasi</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{profile.communicationStyle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
              <Users className="w-4 h-4" style={{ color }} />
            </div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Gaya Kepemimpinan</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{profile.leadershipStyle}</p>
        </div>
      </div>
    </div>
  );
}
