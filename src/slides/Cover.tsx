import { SlideContainer } from '../components/layout/SlideContainer';
import { Navigation } from '../components/layout/Navigation';
import { DiscWheel } from '../components/disc/DiscWheel';

const colors: Record<string, string> = { D: '#EF4444', I: '#F97316', S: '#22C55E', C: '#3B82F6' };
const fullNames: Record<string, string> = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Compliance' };

export function Cover() {
  return (
    <SlideContainer className="flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[length:60px_60px] pointer-events-none" />
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="h-14 shrink-0" />
        <div className="h-8" />
        <div className="w-full max-w-6xl min-w-0 shrink-0 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-navy/5 text-navy text-xs font-semibold rounded-full mb-6 border border-navy/10">
                <span className="w-1.5 h-1.5 rounded-full bg-navy" />
                Talent Assessment Tool
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-navy leading-[1.1] tracking-tight">
                DISC
                <br />
                <span className="text-gradient">Personality</span>
                <br />
                <span className="text-slate-300 font-bold">Assessment</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 mt-6 leading-relaxed max-w-md font-medium">
                Understanding Behavioral Styles and Workplace Preferences
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-1.5">
                  {(['D','I','S','C'] as const).map((ch) => (
                    <div
                      key={ch}
                      className="group relative"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold border-[1.5px] border-white/80 shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: colors[ch], zIndex: 5 }}
                      >
                        {ch}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium text-slate-400 whitespace-nowrap">
                        {fullNames[ch]}
                      </div>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-300 font-medium">Empat dimensi perilaku</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-navy/[0.03] via-transparent to-transparent rounded-full blur-2xl" />
                <DiscWheel size={340} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl shrink-0">
          <Navigation hidePrev />
        </div>
        <div className="h-8" />
      </div>
    </SlideContainer>
  );
}
