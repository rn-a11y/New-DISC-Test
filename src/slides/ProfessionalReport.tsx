import { SlideContainer } from '../components/layout/SlideContainer';
import { useAssessment } from '../context/AssessmentContext';
import { discProfiles } from '../data/profiles';
import { DiscCircleChart, ScoreBars } from '../components/charts/DiscCircleChart';
import { Printer, Heart, Shield, Briefcase, Target, Star, Lightbulb } from 'lucide-react';
import type { DiscDimension } from '../data/types';
import { Button } from '../components/ui/Button';

const dimColors: Record<DiscDimension, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };
const dimNames: Record<DiscDimension, string> = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Compliance' };

function getPressureInterpretation(dim: DiscDimension, change: number): { type: 'strength' | 'risk' | 'neutral'; text: string } {
  if (change >= 4) {
    return { type: 'strength', text: `${dimNames[dim]} meningkat saat di bawah tekanan — individu ini mengandalkan ${dim === 'D' ? 'ketegasan dan pengambilan keputusan cepat' : dim === 'I' ? 'kemampuan komunikasi dan optimisme' : dim === 'S' ? 'kesabaran dan konsistensi' : 'analisis dan ketelitian'} saat menghadapi situasi sulit.` };
  }
  if (change <= -4) {
    return { type: 'risk', text: `${dimNames[dim]} menurun saat di bawah tekanan — individu ini mungkin mengalami kesulitan dalam ${dim === 'D' ? 'pengambilan keputusan dan ketegasan' : dim === 'I' ? 'komunikasi dan ekspresi diri' : dim === 'S' ? 'mempertahankan stabilitas dan kesabaran' : 'analisis dan pengendalian'} saat berada dalam situasi penuh tekanan.` };
  }
  return { type: 'neutral', text: `${dimNames[dim]} relatif stabil di bawah tekanan — individu ini mampu mempertahankan ${dim === 'D' ? 'ketegasan' : dim === 'I' ? 'ekspresi diri' : dim === 'S' ? 'kestabilan' : 'ketelitian'}nya dalam berbagai situasi.` };
}

function getCoachingItems(dominant: DiscDimension, secondary: DiscDimension): string[] {
  const dom = discProfiles[dominant];
  const sec = discProfiles[secondary];
  return [
    `Kembangan ${dom.challenges[0]?.toLowerCase() || 'kesadaran diri'} melalui refleksi rutin dan feedback 360\u00b0`,
    `Optimalkan kekuatan ${dom.title} \u2014 ${dom.strengths[0]?.toLowerCase() || 'kepemimpinan'} \u2014 untuk meningkatkan dampak organisasi`,
    `Manfaatkan gaya ${sec.title} sebagai pelengkap dalam situasi yang membutuhkan ${sec.characteristics[0]?.toLowerCase() || 'fleksibilitas'}`,
    `Bangun strategi komunikasi yang adaptif untuk menjangkau berbagai tipe kepribadian`,
    `Kembangkan ketahanan (resilience) menghadapi tekanan dan perubahan organisasi`,
    `Perkuat kemampuan delegasi dan pemberdayaan tim`,
    `Rencanakan pengembangan karir jangka panjang yang selaras dengan profil DISC`,
    `Latih fleksibilitas perilaku untuk menghadapi situasi yang membutuhkan pendekatan berbeda`,
  ];
}

function BehaviourList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
      {items.map((b, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
          {b}
        </div>
      ))}
    </div>
  );
}

function PageFooter({ name, page }: { name: string; page: number }) {
  return (
    <div className="mt-8 text-[10px] text-slate-300 text-center">
      {name || 'Client Name'} &middot; DISC Test Report &middot; Page {page}
    </div>
  );
}

function PageTitle({ children }: { children: string }) {
  return <h2 className="text-2xl font-bold text-navy mb-6">{children}</h2>;
}

export function ProfessionalReport() {
  const { state } = useAssessment();
  const { participant, result } = state;
  if (!result) return null;

  const rs = result.rawScores;
  const l1 = result.line1;
  const l2 = result.line2;
  const l3 = result.line3;
  const dom = result.dominantStyle;
  const sec = result.secondaryStyle;
  const domProf = discProfiles[dom];
  const secProf = discProfiles[sec];
  const color = dimColors[dom];
  const coaching = getCoachingItems(dom, sec);

  const rsMap = new Map(rs.map(r => [r.dimension, r]));


  const handlePrint = () => window.print();

  const dateStr = participant.date
    ? new Date(participant.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
    : 'APR 2026';

  const name = participant.name || 'Client Name';

  return (
    <SlideContainer className="flex flex-col">
      <div className="no-print flex justify-end px-4 md:px-6 pt-4">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-1.5" /> Cetak / Download PDF
        </Button>
      </div>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .report-page { break-inside: avoid; page-break-after: always; padding: 0.5in !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        .report-page { padding: 2rem; }
        @media (max-width: 768px) { .report-page { padding: 1rem; } }
      `}</style>

      <div className="flex-1 overflow-y-auto bg-slate-50/50">

        {/* ==================== PAGE 1 — COVER ==================== */}
        <div className="report-page min-h-screen flex flex-col bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-black text-navy select-none">DISC</div>
          </div>
          <div className="max-w-3xl mx-auto w-full text-center flex-1 flex flex-col justify-center relative z-10">
            <div className="mb-6">
              <img src="/bsc-logo-white.png" alt="BSC Indonesia" className="h-10 mx-auto opacity-80" />
            </div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy/5">
                {(['D', 'I', 'S', 'C'] as DiscDimension[]).map(d => (
                  <div key={d} className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm" style={{ backgroundColor: dimColors[d] }}>
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-navy mb-2 tracking-tight">DISC PROFILE REPORT</h1>
            <div className="w-20 h-1 rounded-full mx-auto mb-8" style={{ backgroundColor: color }} />

            <p className="text-lg text-slate-500 font-medium">{name}</p>
            <p className="text-sm text-slate-400 mt-1">{dateStr}</p>

            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Prepared by</p>
              <p className="text-base font-bold text-navy">BSC Indonesia</p>
              <p className="text-sm text-slate-400">+62 21 5020 7739</p>
              <p className="text-sm text-slate-400">info@id.bscsolution.com</p>
            </div>

            <p className="mt-6 text-[11px] text-slate-300 font-medium">&copy; 2026 BSC Indonesia. All rights reserved.</p>

            <div className="mt-8 max-w-xl mx-auto text-left bg-slate-50 rounded-xl p-6 border border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">
                Dear {name},<br /><br />
                Thank you for completing the DISC test questionnaire. This assessment
                is a powerful tool that will provide you with deeper insights into your
                personality, communication style, and how you interact with others.
                <br /><br />
                Enclosed, you will find the detailed report of your DISC assessment
                results. We encourage you to review the findings carefully, as they
                can offer valuable guidance in enhancing your strengths and addressing
                areas for improvement.
              </p>
            </div>

            <PageFooter name={name} page={1} />
          </div>
        </div>

        {/* ==================== PAGE 2 — DISC GRAPHIC ==================== */}
        <div className="report-page min-h-screen flex flex-col bg-white" style={{ justifyContent: 'center' }}>
          <div className="max-w-4xl mx-auto w-full text-center">
            <PageTitle>DISC Graphic</PageTitle>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-3 flex justify-center">
                <DiscCircleChart scores={l3.scores} />
              </div>
              <div className="md:col-span-2 text-left">
                <ScoreBars line1={l1.scores} line2={l2.scores} line3={l3.scores} />
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl text-left" style={{ backgroundColor: color + '06', borderColor: color + '30', borderWidth: 1 }}>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Pola Kepribadian:</strong> {l3.pattern.label}
              </p>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{l3.pattern.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {l3.pattern.behaviour.slice(0, 5).map((b, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: color + '15', color }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <PageFooter name={name} page={2} />
          </div>
        </div>

        {/* ==================== PAGE 3 — CHARACTER OVERVIEW ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full">
            <PageTitle>Character Overview</PageTitle>

            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-navy mb-3">1. Public Personality &mdash; {l1.pattern.label}</h3>
                <BehaviourList items={l1.pattern.behaviour} color={color} />
              </div>

              <div className="p-6 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-navy mb-3">2. Personality Under Pressure &mdash; {l2.pattern.label}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {(['D', 'I', 'S', 'C'] as DiscDimension[]).map(dim => {
                    const r = rsMap.get(dim)!;
                    const interp = getPressureInterpretation(dim, r.change);
                    return (
                      <div key={dim} className="flex items-start gap-2 p-3 rounded-lg" style={{
                        backgroundColor: interp.type === 'strength' ? '#F0FDF4' : interp.type === 'risk' ? '#FEF2F2' : '#F8FAFC',
                      }}>
                        <span className="text-sm font-bold shrink-0" style={{ color: dimColors[dim] }}>{dim}</span>
                        <div>
                          <span className="text-[11px] font-semibold" style={{
                            color: interp.type === 'strength' ? '#22C55E' : interp.type === 'risk' ? '#EF4444' : '#94A3B8'
                          }}>
                            {interp.type === 'strength' ? '\u25B2 ' : interp.type === 'risk' ? '\u25BC ' : '\u25C6 '}
                            {interp.type === 'strength' ? 'Strength' : interp.type === 'risk' ? 'Risk' : 'Stabil'}
                          </span>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{interp.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <BehaviourList items={l2.pattern.behaviour} color="#8B5CF6" />
              </div>
            </div>

            <PageFooter name={name} page={3} />
          </div>
        </div>

        {/* ==================== PAGE 4 — HIDDEN TRUE PERSONALITY ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full">
            <PageTitle>Hidden True Personality</PageTitle>

            <div className="p-6 rounded-xl border border-purple-200" style={{ backgroundColor: '#FAF5FF' }}>
              <h3 className="text-base font-bold text-navy mb-3">3. Hidden True Personality &mdash; {l3.pattern.label}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{l3.pattern.description}</p>
              <BehaviourList items={l3.pattern.behaviour} color="#8B5CF6" />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-navy uppercase mb-3 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5" style={{ color }} />
                  Core Motivations
                </h3>
                <ul className="space-y-2">
                  {domProf.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-navy uppercase mb-3 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" style={{ color }} />
                  Values &amp; Internal Drivers
                </h3>
                <ul className="space-y-2">
                  {[
                    `${dom === 'D' ? 'Hasil dan pencapaian' : dom === 'I' ? 'Hubungan dan pengakuan' : dom === 'S' ? 'Stabilitas dan harmoni' : 'Kualitas dan akurasi'}`,
                    `${dom === 'D' ? 'Otonomi dan kendali' : dom === 'I' ? 'Ekspresi diri dan kreativitas' : dom === 'S' ? 'Kepercayaan dan loyalitas' : 'Struktur dan keteraturan'}`,
                    `${dom === 'D' ? 'Efisiensi dan kecepatan' : dom === 'I' ? 'Optimisme dan antusiasme' : dom === 'S' ? 'Konsistensi dan keandalan' : 'Standar dan presisi'}`,
                    `Pengembangan diri dan pembelajaran berkelanjutan`,
                  ].map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#8B5CF6' }} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <PageFooter name={name} page={4} />
          </div>
        </div>

        {/* ==================== PAGE 5 — PERSONALITY DESCRIPTION ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full">
            <PageTitle>Personality Description</PageTitle>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Individu ini memiliki profil kepribadian <strong>{l3.pattern.label}</strong> dengan
                gaya dominan <strong>{domProf.title} ({dom})</strong> dan gaya sekunder{' '}
                <strong>{secProf.title} ({sec})</strong>. Mereka menunjukkan perpaduan unik antara{' '}
                {domProf.title.toLowerCase()} dan {secProf.title.toLowerCase()} dalam perilaku sehari-hari.
              </p>

              <p>
                Individu ini sangat berorientasi pada orang (people-oriented) sambil juga menjunjung
                tinggi akurasi, keandalan, dan loyalitas. Mereka menunjukkan empati dalam interaksi
                dan berusaha menciptakan hubungan positif dengan orang-orang di sekitar mereka. Pada
                saat yang sama, mereka mempertahankan standar pribadi dan profesional yang tinggi,
                menyeimbangkan kesadaran sosial dengan pola pikir yang bertanggung jawab dan
                berorientasi pada tujuan.
              </p>

              <p>
                Mereka ramah, antusias, dan secara alami komunikatif, sering mengekspresikan diri
                dengan cara yang terbuka dan mudah didekati. Pengakuan, apresiasi, dan penerimaan
                sosial adalah motivator penting bagi mereka, dan mereka cenderung bekerja paling
                baik di lingkungan yang harmonis dan kolaboratif. Karena mereka menghargai hubungan
                positif, mereka umumnya menghindari perilaku agresif atau konflik yang tidak perlu,
                lebih memilih diplomasi dan saling pengertian.
              </p>

              <p>
                Selain kekuatan interpersonal mereka, individu ini mampu secara intelektual dan
                bijaksana dalam pengambilan keputusan. Mereka terampil dalam mengumpulkan fakta
                dan informasi pendukung yang relevan sebelum mengambil kesimpulan, memungkinkan
                mereka untuk membuat keputusan yang seimbang dan dipertimbangkan dengan baik. Sementara
                mereka menikmati berinteraksi dengan orang-orang dan berbagai aktivitas, mereka juga
                menghargai stabilitas dan struktur yang mendukung kesuksesan jangka panjang dan
                kerja tim yang efektif.
              </p>

              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 mt-6">
                <h3 className="text-xs font-bold text-navy uppercase mb-3">Key Characteristics</h3>
                <BehaviourList items={l3.pattern.behaviour} color={color} />
              </div>
            </div>

            <PageFooter name={name} page={5} />
          </div>
        </div>

        {/* ==================== PAGE 6 — JOB MATCH ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full">
            <PageTitle>Job Match</PageTitle>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="flex flex-wrap gap-2">
                {l3.pattern.jobs.map((job, i) => (
                  <span key={i} className="text-sm px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: color + '10', color }}>
                    {job}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-navy" />
                <h3 className="text-sm font-bold text-navy">Workplace Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {domProf.workplacePreferences.map((wp, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: color }} />
                    {wp}
                  </div>
                ))}
              </div>
            </div>

            <PageFooter name={name} page={6} />
          </div>
        </div>

        {/* ==================== PAGE 7 — STRENGTHS & DEVELOPMENT ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full">
            <PageTitle>Strengths &amp; Development Areas</PageTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <h3 className="text-xs font-bold text-emerald-700 uppercase mb-3 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" />
                  Key Strengths ({domProf.title})
                </h3>
                <ul className="space-y-2">
                  {domProf.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-emerald-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50">
                <h3 className="text-xs font-bold text-amber-700 uppercase mb-3 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  Development Opportunities
                </h3>
                <ul className="space-y-2">
                  {domProf.developmentAreas.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-amber-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl border border-slate-200 bg-slate-50">
              <h3 className="text-xs font-bold text-navy uppercase mb-3 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5" style={{ color }} />
                Coaching Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coaching.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: color }}>
                      {i + 1}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <PageFooter name={name} page={7} />
          </div>
        </div>

        {/* ==================== PAGE 8 — CLOSING ==================== */}
        <div className="report-page min-h-screen bg-white">
          <div className="max-w-3xl mx-auto w-full flex flex-col justify-center min-h-[80vh]">
            <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: color + '30', backgroundColor: color + '04' }}>
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl mx-auto mb-6" style={{ backgroundColor: dimColors[dom] }}>
                {dom}
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">{domProf.title}-{secProf.title}</h3>
              <p className="text-base text-slate-500 mb-6">{l3.pattern.label}</p>

              <div className="max-w-lg mx-auto text-left text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Secara keseluruhan, individu ini memiliki profil kepribadian <strong>{l3.pattern.label}</strong> dengan kombinasi dominan <strong>{domProf.title} ({dom})</strong> dan sekunder <strong>{secProf.title} ({sec})</strong>.
                </p>
                <p>{l3.pattern.description.replace(/^Anda /, 'Individu ini ')}</p>
                <p>Dengan pengembangan yang tepat pada area-area yang telah diidentifikasi, individu ini memiliki potensi besar untuk memberikan kontribusi signifikan dalam organisasi.</p>
              </div>
            </div>

            <div className="mt-10 text-center text-xs text-slate-300">
              <p>Laporan ini dihasilkan secara otomatis berdasarkan asesmen DISC.</p>
              <p className="mt-1">Hasil asesmen bersifat indikatif dan sebaiknya digunakan sebagai alat pengembangan, bukan alat evaluasi mutlak.</p>
            </div>

            <PageFooter name={name} page={8} />
          </div>
        </div>

      </div>
    </SlideContainer>
  );
}
