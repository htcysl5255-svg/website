import { Star, CheckCircle2, Users, Target, Rocket, Heart, Compass } from "lucide-react";
import { DUMMY_INDEX_PAGE } from "@/lib/dummy-data";

const ICON_MAP: Record<number, React.ReactNode> = {
  0: <Star size={28} />,
  1: <Users size={28} />,
  2: <CheckCircle2 size={28} />,
};

const ACCENT_COLORS = ['bg-emerald-500', 'bg-blue-500', 'bg-pink-500'];
const GLOW_COLORS = ['rgba(16,185,129,0.2)', 'rgba(59,130,246,0.15)', 'rgba(244,63,94,0.15)'];

const PROCESS_STEPS = [
  {
    title: "Hedefini bul",
    description: "İlgi alanlarını ve güçlü yönlerini keşfederek sana gerçekten uygun hedefleri birlikte belirliyoruz.",
    color: "bg-purple-500",
    glow: "rgba(168,85,247,0.3)",
    icon: Target,
  },
  {
    title: "Yola çık",
    description: "Hedefini belirledikten sonra, sana uygun bir yol haritası oluşturuyoruz. Ertelemeden, planlı şekilde ilerle.",
    color: "bg-emerald-500",
    glow: "rgba(16,185,129,0.3)",
    icon: Rocket,
  },
  {
    title: "Yolda kal",
    description: "Yolda karşılaşacağın zorlanmalarda motivasyonunu canlı tutman ve istikrarlı ilerlemen için yanında oluyorum.",
    color: "bg-orange-500",
    glow: "rgba(249,115,22,0.3)",
    icon: Heart,
  },
  {
    title: "Yönünü güncelle",
    description: "Süreç içinde değişen koşullara göre hedeflerini revize eder, yolunu yeniden netleştiririz.",
    color: "bg-blue-500",
    glow: "rgba(59,130,246,0.3)",
    icon: Compass,
  }
];

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
                <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-emerald-950 font-display break-words"
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
            <section key={idx} className="pt-32 pb-16 bg-white/40 border-t border-emerald-500/5 relative overflow-hidden">
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

      {/* ═══════════════════════════════════════
         PROCESS / JOURNEY BLOCK
      ═══════════════════════════════════════ */}
      <section className="pb-40 pt-16 bg-white/40 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-4">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-[3.5rem] left-[15%] right-[15%] z-0 border-t-[3px] border-dashed border-emerald-500/30"></div>

            {/* Mobile Connecting Line */}
            <div className="block lg:hidden absolute top-[2rem] bottom-[4rem] left-[1.75rem] sm:left-[2.5rem] -translate-x-1/2 z-0 border-l-[3px] border-dashed border-emerald-500/30"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 w-full">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative group flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-8">
                    {/* Number / Node */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full flex flex-col items-center justify-center ${step.color} border-4 border-white bg-clip-padding shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 relative z-10`}
                        style={{ boxShadow: `0 10px 40px -10px ${step.glow}` }}>
                        <span className="text-white/80 text-[10px] sm:text-xs font-bold font-sans tracking-widest mb-0.5 lg:mb-1">
                          0{i + 1}
                        </span>
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-2 sm:pt-4 lg:pt-0 lg:text-center w-full">
                      <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 mb-3 font-display transition-colors group-hover:text-emerald-700">{step.title}</h3>
                      <p className="text-emerald-950/60 leading-relaxed font-sans text-[15px] sm:text-[16px]">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
