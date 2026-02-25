import { Star, CheckCircle2, Users } from "lucide-react";
import { DUMMY_INDEX_PAGE } from "@/lib/dummy-data";

const ICON_MAP: Record<number, React.ReactNode> = {
  0: <Star size={28} />,
  1: <Users size={28} />,
  2: <CheckCircle2 size={28} />,
};

const ACCENT_COLORS = ['bg-emerald-500', 'bg-blue-500', 'bg-pink-500'];
const GLOW_COLORS = ['rgba(16,185,129,0.2)', 'rgba(59,130,246,0.15)', 'rgba(244,63,94,0.15)'];

export default function Home() {
  const blocks = DUMMY_INDEX_PAGE.content;

  return (
    <div className="min-h-screen bg-transparent">
      {blocks.map((block: any, idx: number) => {

        /* ═══════════════════════════════════════
           HERO BLOCK
        ═══════════════════════════════════════ */
        if (block.type === 'hero') {
          return (
            <section key={idx} className="relative overflow-hidden mesh-bg">
              {/* Vibrant Soft Background Orbs */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply">
                <div className="animate-glow absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', animationDelay: '0s' }} />
                <div className="animate-glow absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)', animationDelay: '2s' }} />
                <div className="animate-glow absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)', animationDelay: '4s' }} />
              </div>

              <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-44 text-center">
                {/* Lively Professional Badge */}
                {block.badge && (
                  <div className="animate-fade-up inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-10 text-[13px] font-bold tracking-widest uppercase text-emerald-900/80 border border-emerald-500/20 bg-white/70 backdrop-blur-md shadow-sm font-sans"
                    style={{ animationDelay: '0s' }}>
                    <span className="accent-dot bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                    {block.badge}
                  </div>
                )}

                {/* Vibrant Headline (Outfit) */}
                <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-emerald-950 font-display"
                  style={{ animationDelay: '0.1s' }}>
                  {block.title?.split(' ').slice(0, -2).join(' ')}{' '}
                  <span className="gradient-text">{block.title?.split(' ').slice(-2).join(' ')}</span>
                </h1>

                {/* Professional Subtitle (Inter) */}
                {block.subtitle && (
                  <p className="animate-fade-up text-lg sm:text-xl text-emerald-950/60 max-w-2xl mx-auto leading-relaxed font-medium font-sans"
                    style={{ animationDelay: '0.2s' }}>
                    {block.subtitle}
                  </p>
                )}
              </div>
            </section>
          );
        }

        /* ═══════════════════════════════════════
           FEATURES BLOCK
        ═══════════════════════════════════════ */
        if (block.type === 'features') {
          if (!block.items || block.items.length === 0) return null;

          return (
            <section key={idx} className="py-40 bg-white/40 border-t border-emerald-500/5 relative overflow-hidden">
              {/* Soft subtle glow under features */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(5,150,105,0.02),transparent_70%)] pointer-events-none" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                  {block.items.map((item: any, i: number) => {
                    if (!item.title) return null;
                    const accentColor = ACCENT_COLORS[i % 3] || ACCENT_COLORS[0];
                    const glowColor = GLOW_COLORS[i % 3] || GLOW_COLORS[0];

                    return (
                      <div key={i} className="feature-card group flex flex-col items-center text-center">
                        {/* Distinct Colorful Icon Container */}
                        <div className="mb-10 relative">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${accentColor} border border-white/20 text-white transition-all duration-500 group-hover:scale-110 shadow-lg`}
                            style={{ boxShadow: `0 10px 30px -10px ${glowColor}` }}>
                            {ICON_MAP[i % 3] || <Star size={26} />}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-emerald-950 mb-4 font-display transition-colors group-hover:text-emerald-700">{item.title}</h3>
                        <p className="text-emerald-950/60 leading-relaxed font-sans text-[16px]">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
