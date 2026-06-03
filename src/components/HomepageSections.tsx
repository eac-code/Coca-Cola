import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight, Check, Flame } from 'lucide-react';
import { PRODUCTS, RECIPES_AND_MOMENTS, Product } from '../types';

interface HomepageSectionsProps {
  onSelectProduct: (productId: 'zero-sugar') => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function HomepageSections({ onSelectProduct, onTriggerGA4 }: HomepageSectionsProps) {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [formError, setFormError] = useState('');
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
      onTriggerGA4('cta_click', {
        label: `carousel_scroll_${direction}`,
        target: 'product_carousel'
      });
    }
  };

  const handleDiscoverProduct = (product: Product) => {
    onTriggerGA4('cta_click', {
      label: `discover_${product.id}`,
      product_name: product.name
    });

    if (product.id === 'zero-sugar') {
      onSelectProduct('zero-sugar');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Simulate/Show elegant details pop-up overlay
      alert(`You clicked ${product.name}! Check out 'Coca-Cola Zero Sugar' (click Our Drinks -> Zero Sugar) to experience our fully functional, premium product detail interactive section!`);
    }
  };

  const handleStoryLinkClick = () => {
    onTriggerGA4('cta_click', {
      label: 'story_learn_more',
      location: 'split_story_teaser'
    });
    alert("Our premium historical archives document our incredible journey from Atlanta in 1886 to global community initiatives today, driving deep brand alignment.");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('An email address is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid format (e.g. name@domain.com).');
      return;
    }

    setSignedUp(true);
    onTriggerGA4('email_signup', {
      source: 'homepage_middle_capture_bar',
      email_domain: email.split('@')[1] || ''
    });
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <div className="bg-white text-slate-950 font-sans">
      
      {/* SECTION A — Product Carousel */}
      <section 
        id="products-carousel-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-200"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#E8001A] font-bold text-[10px] tracking-widest uppercase block mb-1">
              The Red Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic font-light tracking-tight text-slate-900">
              Discover your perfect flavor.
            </h2>
            <p className="text-sm md:text-base text-zinc-500 mt-2 max-w-xl font-light">
              From our timeless original recipe to bold, mind-bending cultural creations. Try a crisp, ice-cold sip of shared happiness.
            </p>
          </div>

          {/* Symmetrical Controls for Scroll */}
          <div className="flex gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 border border-zinc-900 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors rounded-none focus:outline-none"
              aria-label="Scroll product carousel left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 border border-zinc-900 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors rounded-none focus:outline-none"
              aria-label="Scroll product carousel right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent select-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {PRODUCTS.map((prod) => (
            <div 
              key={prod.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start bg-white border border-zinc-200 rounded-none overflow-hidden transition-all duration-300 hover:border-black group relative"
            >
              {/* Card visual accent - color code tag */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {prod.id === 'zero-sugar' && (
                  <span className="bg-black text-white font-bold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-none flex items-center gap-1 border border-zinc-800">
                    <Flame className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> Hot Seller
                  </span>
                )}
                <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-none">
                  {prod.flavorProfile}
                </span>
              </div>

              {/* Product Image Panel */}
              <div className="h-64 bg-zinc-50 flex items-center justify-center p-6 relative overflow-hidden border-b border-zinc-100">
                <div className="absolute inset-0 bg-zinc-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="h-44 object-contain transform group-hover:scale-105 transition-transform duration-500 origin-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.1)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Panel */}
              <div className="p-5 flex flex-col justify-between h-[180px]">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#E8001A] text-lg uppercase tracking-tight transition-colors duration-200">
                    {prod.name}
                  </h3>
                  <p className="text-zinc-500 text-xs font-light tracking-wide mt-1 line-clamp-2">
                    {prod.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    {prod.calories} serving
                  </span>

                  <button
                    onClick={() => handleDiscoverProduct(prod)}
                    className="flex items-center gap-1.5 bg-zinc-950 hover:bg-[#E8001A] text-white font-bold text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-none transition-colors duration-300 focus:outline-none"
                  >
                    Discover
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION B — Brand Story Teaser */}
      <section 
        ref={storyRef}
        id="brand-story-section"
        className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] border-b border-black"
      >
        {/* Left Side: Bold Red Quote */}
        <div className="bg-[#E8001A] text-white p-12 md:p-20 flex flex-col justify-center items-start relative overflow-hidden">
          {/* Subtle logo pattern in BG */}
          <div className="absolute right-0 bottom-0 text-white/5 font-serif text-[180px] font-bold select-none pointer-events-none transform translate-y-16 translate-x-12">
            1886
          </div>
          
          <motion.div
            style={{
              transform: storyInView ? "none" : "translateY(30px)",
              opacity: storyInView ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
            }}
            className="space-y-6 relative z-10 max-w-md"
          >
            <blockquote className="text-3xl md:text-5xl font-serif italic font-light tracking-tight leading-tight">
              “Since 1886, we’ve been making moments matter.”
            </blockquote>
            <p className="text-red-100 text-sm leading-relaxed font-light">
              True refreshment always unites communities. Generation after generation, Coca-Cola is there to elevate dinners, sweeten achievements, and celebrate simple, shared joy.
            </p>
            <div>
              <button
                onClick={handleStoryLinkClick}
                className="inline-flex items-center gap-2 bg-white text-[#E8001A] font-bold tracking-widest text-xs uppercase px-6 py-4 rounded-none hover:bg-black hover:text-white hover:border-black border border-transparent transition-all duration-300 focus:outline-none"
              >
                Our story
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Black and White Archive Photo */}
        <div className="relative min-h-[350px] bg-zinc-950 overflow-hidden group">
          <img 
            src="/src/assets/images/coke_archive_bw_1780510980156.png" 
            alt="Vintage Coca-Cola archival photo" 
            className="w-full h-full object-cover grayscale opacity-75 group-hover:scale-102 group-hover:opacity-85 transition-all duration-750" 
            referrerPolicy="no-referrer"
          />
          {/* Overlay to darken slightly */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <span className="bg-black/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-widest uppercase border border-zinc-800 px-3.5 py-1.5 rounded-none mb-3 inline-block">
              Vintage Heritage
            </span>
            <h3 className="text-white font-serif italic font-light text-2xl md:text-3xl tracking-tight">
              A century of authentic human smiles.
            </h3>
          </div>
        </div>
      </section>

      {/* SECTION C — Email Capture Bar */}
      <section 
        id="email-capture-strip"
        className="bg-[#E8001A] text-white py-14 px-4 sm:px-6 lg:px-8 relative z-15 border-t border-red-700"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif italic font-light tracking-tight text-white leading-none">
              Be first to know.
            </h2>
            <p className="text-[10px] text-rose-100 font-bold uppercase tracking-widest mt-1">
              No spam. Just exclusive drops and drops collections.
            </p>
          </div>

          <form onSubmit={handleSignup} className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-0 max-w-sm mx-auto border border-white/30">
              <label htmlFor="hp-capture-email" className="sr-only">
                Email Signups
              </label>
              <input 
                id="hp-capture-email"
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={signedUp}
                className="bg-transparent text-white placeholder-rose-200/60 rounded-none px-4 py-3.5 text-xs w-full sm:w-64 focus:outline-none"
              />
              <button
                type="submit"
                disabled={signedUp}
                className="bg-zinc-950 hover:bg-black disabled:bg-emerald-600 font-bold tracking-widest text-[10px] uppercase text-white px-7 py-3.5 rounded-none transition duration-200 shadow-none border-l border-white/30 flex items-center justify-center gap-1"
              >
                {signedUp ? <Check className="w-4 h-4" /> : 'Register'}
              </button>
            </div>
            {formError && (
              <p className="text-xs text-white font-bold text-center md:text-left mt-2" role="alert">
                {formError}
              </p>
            )}
            {signedUp && (
              <p className="text-[10px] text-white font-bold text-center md:text-left mt-2 tracking-wide uppercase" role="status">
                ✓ Registered! Exclusive collections updates synced.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* SECTION D — Recipes & Moments Grid */}
      <section 
        id="recipes-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center md:text-left mb-12">
          <span className="text-[#E8001A] font-bold text-[10px] tracking-widest uppercase block mb-1">
            Life Pairing Guide
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic font-light tracking-tight text-slate-900">
            Inspiring recipes & simple moments.
          </h2>
          <p className="text-sm md:text-base text-zinc-500 mt-2 max-w-xl font-light">
            Sip and savor. These hand-picked culinary recipes elevate dynamic family meals, cozy holidays, and sunny summer hangouts.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECIPES_AND_MOMENTS.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-none overflow-hidden border border-zinc-200 transition-all duration-300 hover:border-black group"
            >
              {/* Image Frame */}
              <div className="h-56 bg-zinc-100 overflow-hidden relative border-b border-zinc-105">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 pb-0" 
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-4 left-4 bg-[#E8001A] text-white text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-none shadow-none">
                  {item.tag}
                </span>
                <span className="absolute bottom-4 right-4 bg-black/90 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-none border border-zinc-805">
                  {item.readTime}
                </span>
              </div>

              {/* Text Frame */}
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight group-hover:text-[#E8001A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-2.5 leading-relaxed font-light">
                  Discover simple lists of fresh culinary ingredients, step-by-step master chef guidance, and tips to ensure chilling serves match.
                </p>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <button
                    onClick={() => {
                      onTriggerGA4('cta_click', { label: `recipe_${item.id}_view` });
                      alert(`Opening "${item.title}" Full Editorial Guide: Ingredients & steps, optimal glass chilling, and perfect temperature pairings.`);
                    }}
                    className="text-[#E8001A] hover:text-black flex items-center gap-1.5 focus:outline-none"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Guide
                  </button>

                  <button
                    onClick={() => {
                      const shareText = `Check out this amazing recipe: ${item.title} paired with ice-cold Coca-Cola!`;
                      onTriggerGA4('cta_click', { label: `recipe_share_${item.id}` });
                      if (navigator.share) {
                        navigator.share({ title: item.title, text: shareText, url: window.location.href }).catch(() => {});
                      } else {
                        alert(`Copied sharing link to clipboard: "${shareText}"`);
                      }
                    }}
                    className="text-zinc-400 hover:text-zinc-900 transition-colors focus:outline-none"
                    aria-label="Share recipe"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
