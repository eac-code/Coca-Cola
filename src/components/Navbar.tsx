import { useState, useEffect } from 'react';
import { Search, MapPin, Menu, X, Gift, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'pdp' | 'sitemap';
  setView: (view: 'home' | 'pdp' | 'sitemap') => void;
  onOpenStoreLocator: () => void;
  onOpenLoyaltyModal: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function Navbar({
  currentView,
  setView,
  onOpenStoreLocator,
  onOpenLoyaltyModal,
  onTriggerGA4
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'pdp' | 'sitemap', label: string) => {
    setView(view);
    setMobileMenuOpen(false);
    onTriggerGA4('cta_click', {
      label: `nav_${label}`,
      target_view: view
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoreLocatorClick = () => {
    onTriggerGA4('store_locator_open', { source: 'navbar_cta' });
    onOpenStoreLocator();
    setMobileMenuOpen(false);
  };

  // Coca-Cola Spencerian script inspired SVG logotype
  const CokeLogoSVG = () => (
    <svg 
      className="h-7 md:h-10 w-auto fill-current transition-colors duration-300"
      viewBox="0 0 300 100" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Coca-Cola Logo"
    >
      <text 
        x="10" 
        y="75" 
        fontFamily="'Brush Script MT', 'Playfair Display', cursive, sans-serif" 
        fontSize="68" 
        fontWeight="bold"
        fontStyle="italic"
        className="font-[Spencerian_Script]"
      >
        Coca-Cola
      </text>
      {/* Wave flourish */}
      <path 
        d="M 12 85 C 80 85, 140 65, 290 85 C 220 80, 100 95, 12 85 Z" 
      />
    </svg>
  );

  const isTransparent = currentView === 'home' && !isScrolled;

  return (
    <header 
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent text-white border-b border-white/10' 
          : 'bg-white text-slate-950 border-b border-zinc-900 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Brand Logotype */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home', 'logo')}
            className={`flex items-center focus:outline-2 focus:outline-red-500 rounded-none p-1 ${
              isTransparent ? 'text-white' : 'text-[#E8001A]'
            }`}
            aria-label="Coca-Cola Home"
          >
            <CokeLogoSVG />
          </button>

          {/* Centre: Nav links */}
          <nav 
            className="hidden md:flex items-center space-x-6"
            aria-label="Primary Navigation"
          >
            <button
              id="nav-link-drinks"
              onClick={() => handleNavClick('home', 'our_drinks')}
              className={`font-bold tracking-widest text-[11px] uppercase hover:text-[#E8001A] transition-all focus:outline-2 focus:outline-red-500 p-2 rounded-none ${
                currentView === 'home' ? 'text-[#E8001A] border-b-2 border-[#E8001A]' : 'opacity-80'
              }`}
            >
              Our Drinks
            </button>
            <button
              id="nav-link-zero-sugar"
              onClick={() => handleNavClick('pdp', 'zero_sugar')}
              className={`font-bold tracking-widest text-[11px] uppercase hover:text-[#E8001A] transition-all focus:outline-2 focus:outline-red-500 p-2 rounded-none ${
                currentView === 'pdp' ? 'text-[#E8001A] border-b-2 border-[#E8001A]' : 'opacity-80'
              }`}
            >
              Zero Sugar
            </button>
            <button
              id="nav-link-sitemap"
              onClick={() => handleNavClick('sitemap', 'sitemap')}
              className={`font-bold tracking-widest text-[11px] uppercase hover:text-[#E8001A] transition-all focus:outline-2 focus:outline-red-500 p-2 rounded-none ${
                currentView === 'sitemap' ? 'text-[#E8001A] border-b-2 border-[#E8001A]' : 'opacity-80'
              }`}
            >
              Sitemap & Technical
            </button>
            <button
              id="nav-link-rewards"
              onClick={() => {
                onTriggerGA4('cta_click', { label: 'nav_rewards_popup' });
                onOpenLoyaltyModal();
              }}
              className="font-bold tracking-widest text-[11px] uppercase hover:text-[#E8001A] flex items-center gap-1.5 transition-all focus:outline-2 focus:outline-red-500 p-2 rounded-none opacity-80"
            >
              <Gift className="w-3.5 h-3.5 text-[#E8001A]" />
              Rewards
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-search-button"
              className="p-2 text-current hover:text-[#E8001A] transition-colors focus:outline-none rounded-none"
              aria-label="Search drinks and retail partners"
              onClick={() => onTriggerGA4('search_opened', { source: 'navbar' })}
            >
              <Search className="w-4 h-4" />
            </button>
            
            <button
              id="nav-cta-store-locator"
              onClick={handleStoreLocatorClick}
              className={`flex items-center gap-1.5 border font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-none transition-colors duration-300 focus:outline-none ${
                isTransparent 
                  ? 'border-white text-white hover:bg-white hover:text-[#E8001A]' 
                  : 'border-[#E8001A] text-white bg-[#E8001A] hover:bg-transparent hover:text-[#E8001A]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Find a Store
            </button>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="mobile-search"
              aria-label="Search"
              className="p-2 text-current hover:text-[#E8001A]"
              onClick={() => onTriggerGA4('search_opened', { source: 'mobile_navbar' })}
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              id="hamburger-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-none text-current hover:text-[#E8001A] transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-zinc-950 text-white border-b border-zinc-800 shadow-none transition-all duration-300 rounded-none"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              id="mobile-nav-drinks"
              onClick={() => handleNavClick('home', 'our_drinks')}
              className="block w-full text-left px-4 py-3 text-xs font-bold tracking-widest uppercase border-b border-zinc-900 hover:text-[#E8001A]"
            >
              Our Drinks
            </button>
            <button
              id="mobile-nav-zero-sugar"
              onClick={() => handleNavClick('pdp', 'zero_sugar')}
              className="block w-full text-left px-4 py-3 text-xs font-bold tracking-widest uppercase border-b border-zinc-900 hover:text-[#E8001A]"
            >
              Zero Sugar
            </button>
            <button
              id="mobile-nav-sitemap"
              onClick={() => handleNavClick('sitemap', 'sitemap')}
              className="block w-full text-left px-4 py-3 text-xs font-bold tracking-widest uppercase border-b border-zinc-900 hover:text-[#E8001A]"
            >
              Sitemap & Technical
            </button>
            <button
              id="mobile-nav-rewards"
              onClick={() => {
                setMobileMenuOpen(false);
                onTriggerGA4('cta_click', { label: 'mobile_nav_rewards' });
                onOpenLoyaltyModal();
              }}
              className="w-full text-left px-4 py-3 text-xs font-bold tracking-widest uppercase border-b border-zinc-900 hover:text-[#E8001A] flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#E8001A]" />
              Rewards
            </button>
            <button
              id="mobile-nav-store-locator"
              onClick={handleStoreLocatorClick}
              className="w-full flex items-center justify-center gap-2 bg-[#E8001A] hover:bg-red-700 text-white font-bold text-center px-6 py-3.5 tracking-widest uppercase text-xs rounded-none transition duration-200 mt-4"
            >
              <MapPin className="w-4 h-4" />
              Find a Store
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
