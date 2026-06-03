import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreDrinks: () => void;
  onOpenStoreLocator: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function Hero({ onExploreDrinks, onOpenStoreLocator, onTriggerGA4 }: HeroProps) {
  
  const handleCTAExploreClick = () => {
    onTriggerGA4('cta_click', {
      label: 'hero_explore_drinks',
      location: 'above_the_fold'
    });
    onExploreDrinks();
  };

  const handleCTAStoreClick = () => {
    onTriggerGA4('cta_click', {
      label: 'hero_find_store',
      location: 'above_the_fold'
    });
    onTriggerGA4('store_locator_open', { source: 'hero_cta' });
    onOpenStoreLocator();
  };

  return (
    <section 
      id="hero-viewport"
      className="relative min-h-[95vh] md:min-h-screen bg-[#E8001A] text-white flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-primary-heading"
    >
      
      {/* Subtle Spencerian Wave SVG Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <svg 
          className="absolute bottom-0 left-0 w-full h-[60%] fill-white transform translate-y-16 scale-y-125"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,96C180,180,360,240,540,240C720,240,900,180,1080,112C1260,40,1440,-60,1440,32V320H0Z" />
          <path d="M0,192C240,240,480,260,720,180C960,100,1200,-20,1440,64V320H0Z" className="opacity-60" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copyspace, Typography & Conversions (above the fold) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Tag/Badge for promotional interest */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <span className="bg-white/10 text-white font-bold text-[10px] tracking-widest uppercase px-4 py-2 rounded-none border border-white/10 backdrop-blur-sm">
                Refreshing World Moments Since 1886
              </span>
            </motion.div>

            {/* Spencerian Style Heading */}
            <motion.h1 
              id="hero-primary-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl sm:text-8xl font-serif italic font-light tracking-tighter leading-none text-white focus:outline-none mb-4"
            >
              Open happiness.
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-white/90 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Discover the taste the world shares. Real magic is just a sip away. A ice-cold beverage details the stories of real friendship.
            </motion.p>

            {/* Fully Responsive CTA Placement - Above the Fold Optimisation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-action-explore-drinks"
                onClick={handleCTAExploreClick}
                className="w-full sm:w-auto bg-white text-[#E8001A] hover:bg-neutral-100 font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-none shadow-none transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group focus:outline-none"
              >
                Explore our drinks
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                id="hero-action-find-store"
                onClick={handleCTAStoreClick}
                className="w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#E8001A] font-bold tracking-widest text-xs uppercase px-8 py-3.5 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none"
              >
                <MapPin className="w-4 h-4" />
                Find a store
              </button>
            </motion.div>

            {/* Bullet list for reassuring quality trust directly below triggers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-white/80 text-[10px] font-bold tracking-widest uppercase"
            >
              <span className="flex items-center gap-1">■ Original Recipe</span>
              <span className="flex items-center gap-1">■ Recycled Packs</span>
              <span className="flex items-center gap-1">■ Zero Sugar Option</span>
            </motion.div>

          </div>

          {/* Right Column: Sweating Coke Bottle (fade + rise entrance animation) */}
          <div className="lg:col-span-5 flex justify-center relative select-none">
            
            {/* Soft Radial Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-none bg-rose-500/10 blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 90,
                delay: 0.1,
                duration: 1.2
              }}
              whileHover={{ scale: 1.02 }}
              className="relative z-10 w-[240px] sm:w-[320px] lg:w-[380px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
              aria-hidden="true"
            >
              <img 
                src="/src/assets/images/coke_hero_bottle_1780510948533.png" 
                alt="Sweating glass bottle of Coca-Cola Original" 
                className="w-full h-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />

              {/* Condensation Highlight floating labels */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-[30%] -right-4 sm:-right-8 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-none p-2.5 shadow-none flex items-center gap-2 max-w-[150px] border-l-2 border-l-[#E8001A]"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-white leading-tight">Glistening Condensation</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute bottom-[25%] -left-6 sm:-left-12 bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-none p-2.5 flex items-center gap-2 max-w-[140px] border-l-2 border-l-[#E8001A]"
              >
                <span className="text-[9px] font-bold tracking-widest uppercase text-white leading-tight">100% Recyclable</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
}
