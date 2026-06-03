import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldAlert, ShoppingBag, MapPin, ChevronDown, ChevronUp, Share2, Flame, ThumbsUp } from 'lucide-react';
import { FOOD_PAIRINGS, PRODUCTS, Product } from '../types';

interface ProductDetailProps {
  onOpenStoreLocator: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function ProductDetail({ onOpenStoreLocator, onTriggerGA4 }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('500ml'); // 330ml Can, 500ml Bottle, 1.5L Bottle
  const [activeAccordion, setActiveAccordion] = useState<string | null>('cal');
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [counter, setCounter] = useState(199342500); // Dynamic count animated
  const dragStartRef = useRef(0);

  // Trigger product_view event on load
  useEffect(() => {
    onTriggerGA4('product_view', {
      product_id: 'zero-sugar',
      product_name: 'Coca-Cola Zero Sugar',
      currency: 'USD',
      value: 1.89
    });

    // Simulated ticking up of enjoyed-by count
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 3D CSS rotate logic on Mouse Interactivity
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current;
      setRotation((prev) => prev + deltaX * 0.5);
      dragStartRef.current = e.clientX;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleBuyOnline = () => {
    onTriggerGA4('cta_click', {
      label: 'pdp_buy_online',
      product: 'zero_sugar',
      unit_size: selectedSize
    });
    alert(`Redirecting you to our local e-commerce delivery partners (Instacart, Amazon Fresh, Kroger) to order a cold Coca-Cola Zero Sugar (${selectedSize}) directly to your doorstep!`);
  };

  const handleFindInStore = () => {
    onTriggerGA4('store_locator_open', { source: 'pdp_cta' });
    onOpenStoreLocator();
  };

  const selectSizeHelper = (size: string) => {
    setSelectedSize(size);
    onTriggerGA4('variant_selected', {
      product: 'zero_sugar',
      size: size
    });
  };

  // Content sizes configuration mapping
  const sizeMeta: Record<string, { height: string; label: string; tag: string }> = {
    '330ml': { height: 'h-48 sm:h-56', label: '330ml Premium Sleek Can', tag: 'Chilled Quick Refresh' },
    '500ml': { height: 'h-60 sm:h-72', label: '500ml 100% Recycled Bottle', tag: 'On-The-Go Standard' },
    '1.5L': { height: 'h-72 sm:h-80', label: '1.5L Family Share Bottle', tag: 'Perfect Dinner Partner' },
  };

  // Structured schema for search engine optimization
  const jsonLdSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Coca-Cola Zero Sugar",
    "image": [
      "/src/assets/images/coke_zero_pdp_1780510965111.png"
    ],
    "description": "Crafted for those who want the full, bold flavor of our classic recipe, but with zero sugar and zero calories.",
    "sku": "CC-ZERO-500",
    "mpn": "9801235",
    "brand": {
      "@type": "Brand",
      "name": "Coca-Cola"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "1.29",
      "highPrice": "4.99",
      "offerCount": "100"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1284"
    }
  };

  return (
    <div className="bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </script>

      {/* REQUIREMENT 1: Full-width hero banner in black with red accent */}
      <div className="relative pt-24 md:pt-32 pb-16 bg-[#070707] border-b border-zinc-850">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-black border border-red-500/40 px-3.5 py-1.5 rounded-none text-[10px] font-bold text-red-500 tracking-widest uppercase mb-4"
          >
            <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" /> New Sleek Formula
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif italic font-light tracking-tight text-white focus:outline-none"
          >
            Zero <span className="text-[#E8001A]">Sugar</span>
          </motion.h1>

          <p className="text-zinc-400 font-light tracking-widest text-[10px] uppercase mt-4 max-w-md mx-auto">
            A brand secret formula co-created with fans of delicious refreshment.
          </p>
        </div>
      </div>

      {/* REQUIREMENT 2: Two-column section below */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive 3D product image placeholder with variant selector */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Instruction tooltip */}
            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest bg-zinc-950 border border-zinc-800 px-3.5 py-1.5 rounded-none mb-6">
              ↔ Drag to Rotate bottle 360°
            </span>

            {/* Simulated 3D stage */}
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="w-full relative max-w-md h-[400px] bg-zinc-950 border border-zinc-850 flex items-center justify-center cursor-grab active:cursor-grabbing p-8 overflow-hidden group select-none shadow-none"
            >
              {/* Backlight reflection */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-none bg-[#E8001A]/5 blur-3xl group-hover:bg-[#E8001A]/10 transition-all duration-300" />

              {/* Size helper label in dynamic stage container */}
              <div className="absolute top-4 left-4">
                <span className="bg-red-500/10 text-red-500 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-none border border-red-500/20">
                  {sizeMeta[selectedSize].tag}
                </span>
              </div>

              {/* 3D Visual container based on drag calculation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSize}
                  style={{ transform: `rotateY(${rotation}deg)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`${sizeMeta[selectedSize].height} flex items-center justify-center relative z-10 transition-all duration-500`}
                >
                  <img 
                    src="/src/assets/images/coke_zero_pdp_1780510965111.png" 
                    alt={`Coca-Cola Zero Sugar ${selectedSize} variant`}
                    className="h-full object-contain drop-shadow-[0_15px_20px_rgba(232,0,26,0.15)] origin-center pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Variant Selector (Can, 500ml glass, 1.5L bottle) */}
            <div className="mt-8">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest text-center block mb-3.5">
                Select container volume variant
              </span>

              <div className="flex gap-2 bg-[#090909] p-1.5 rounded-none border border-zinc-800" role="radiogroup" aria-label="Select container size">
                {['330ml', '500ml', '1.5L'].map((size) => (
                  <button
                    key={size}
                    id={`variant-btn-${size}`}
                    onClick={() => selectSizeHelper(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                    className={`px-5 py-3 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300 focus:outline-none ${
                      selectedSize === size
                        ? 'bg-[#E8001A] text-white shadow-none'
                        : 'bg-transparent text-zinc-400 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Description, key facts, CTAs, and CRO elements */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[#E8001A] text-[10px] font-bold tracking-widest uppercase block">
                No Sugar. No Calories. Classic Coca-Cola Snap.
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-white font-light tracking-tight leading-none">
                The Zero Sugar Standard
              </h2>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Enjoyed globally, Coca-Cola Zero Sugar packs the signature classic caramel notes, comforting sparkles, and full-bodied refreshing pop of Coca-Cola, but contains absolutely zero calories and zero sugars. It’s flavor perfection under black-and-red typography locks.
              </p>
            </div>

            {/* Key Nutritional Facts checklist */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-none text-center">
                <span className="text-[10px] font-bold text-red-500 block mb-0.5 uppercase tracking-widest">Sugar</span>
                <span className="text-2xl font-bold font-serif italic text-white">0g</span>
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest block mt-1">Zero Sugar</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-none text-center">
                <span className="text-[10px] font-bold text-red-500 block mb-0.5 uppercase tracking-widest">Calories</span>
                <span className="text-2xl font-bold font-serif italic text-white">0 kcal</span>
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest block mt-1 flex-1">Non-Caloric</span>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-none text-center col-span-2 md:col-span-1">
                <span className="text-[10px] font-bold text-red-500 block mb-0.5 uppercase tracking-widest">Taste</span>
                <span className="text-2xl font-bold font-serif italic text-white">100%</span>
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest block mt-1">Original recipe</span>
              </div>
            </div>

            {/* CRO URGENCY COPY: REQUIREMENT (4) */}
            <div className="bg-red-950/20 border border-red-505/20 rounded-none p-4 flex items-center gap-4">
              <div className="p-2.5 bg-[#E8001A] text-white rounded-none animate-pulse shrink-0" aria-hidden="true">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">
                  Limited Edition Design Alert
                </p>
                <p className="text-xs text-rose-200 mt-1 font-light font-sans">
                  Only <span className="font-bold underline text-white">224 units</span> remainder left in select retail ZIP shelves near you today. Secure Yours.
                </p>
              </div>
            </div>

            {/* Two Product CTAs: REQUIREMENT (2) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="pdp-buy-online-btn"
                onClick={handleBuyOnline}
                className="flex-1 bg-[#E8001A] hover:bg-white hover:text-black hover:border-white border border-transparent text-white font-bold tracking-widest text-xs uppercase px-8 py-4.5 rounded-none transition-all duration-300 flex items-center justify-center gap-2.5 focus:outline-none"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy online
              </button>

              <button
                id="pdp-find-in-store-btn"
                onClick={handleFindInStore}
                className="flex-1 bg-transparent text-white border border-zinc-700 hover:border-white hover:bg-white/10 font-bold tracking-widest text-xs uppercase px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none"
              >
                <MapPin className="w-4 h-4 text-rose-100" />
                Find in store
              </button>
            </div>

            <p className="text-center sm:text-left text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
              ✦ Guaranteed shipping freshness in local retailer thermal bags. Order directly.
            </p>

          </div>

        </div>
      </section>

      {/* REQUIREMENT 4: Nutritional Info Accordion */}
      <section className="bg-[#0A0A0A] border-t border-b border-zinc-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#E8001A] font-bold text-[10px] tracking-widest uppercase block mb-1">
              Complete Disclosure
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic text-white font-light tracking-tight">
              Nutritional Facts & Details
            </h2>
            <p className="text-xs text-zinc-500 font-light mt-2">
              Transparency details that align beauty and chemical safety. Clean values.
            </p>
          </div>

          <div className="space-y-3.5" role="presentation">
            {/* Fact 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden">
              <button
                id="accordion-toggle-cal"
                onClick={() => setActiveAccordion(activeAccordion === 'cal' ? null : 'cal')}
                aria-expanded={activeAccordion === 'cal'}
                className="w-full flex items-center justify-between p-5 text-left font-bold tracking-widest uppercase text-xs hover:bg-zinc-900 transition-colors focus:outline-none"
              >
                <span>Calorie Breakdown (0 kcal)</span>
                {activeAccordion === 'cal' ? <ChevronUp className="w-4 h-4 text-red-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {activeAccordion === 'cal' && (
                <div className="p-5 border-t border-zinc-800 text-xs text-zinc-400 bg-black/30 leading-relaxed space-y-2 font-light">
                  <p>Coca-Cola Zero Sugar contains zero calories per 330ml sleek can serving. There represents absolutely no energy surplus, matching all clean, balanced metabolic lifestyle standards.</p>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase pt-2 tracking-wider">
                    <span>Reference Intake:</span>
                    <span>0% RI</span>
                  </div>
                </div>
              )}
            </div>

            {/* Fact 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden">
              <button
                id="accordion-toggle-sugar"
                onClick={() => setActiveAccordion(activeAccordion === 'sugar' ? null : 'sugar')}
                aria-expanded={activeAccordion === 'sugar'}
                className="w-full flex items-center justify-between p-5 text-left font-bold tracking-widest uppercase text-xs hover:bg-zinc-900 transition-colors focus:outline-none"
              >
                <span>Carbohydrate & Sugar Profiles (0g Sugar)</span>
                {activeAccordion === 'sugar' ? <ChevronUp className="w-4 h-4 text-red-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {activeAccordion === 'sugar' && (
                <div className="p-5 border-t border-zinc-800 text-xs text-zinc-400 bg-black/30 leading-relaxed space-y-2 font-light">
                  <p>Carbohydrates count: 0g. Total food sugars count: 0g. Sweetness is provided by safety-regulatory-approved low-calorie intense sweeteners (Aspartame and Acesulfame-K), formulated safely to avoid insulin surges of traditional sucrose.</p>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-wide uppercase">Contains a source of Phenylalanine.</p>
                </div>
              )}
            </div>

            {/* Fact 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden">
              <button
                id="accordion-toggle-chem"
                onClick={() => setActiveAccordion(activeAccordion === 'chem' ? null : 'chem')}
                aria-expanded={activeAccordion === 'chem'}
                className="w-full flex items-center justify-between p-5 text-left font-bold tracking-widest uppercase text-xs hover:bg-zinc-900 transition-colors focus:outline-none"
              >
                <span>Additives, Citrates, & Sodium Contents</span>
                {activeAccordion === 'chem' ? <ChevronUp className="w-4 h-4 text-red-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {activeAccordion === 'chem' && (
                <div className="p-5 border-t border-zinc-800 text-xs text-zinc-400 bg-black/30 leading-relaxed space-y-2 font-light">
                  <p>In addition to filtered carbonated water, Zero Sugar holds: color caramel (E150d), acidulant phosphoric acid, acid regulators (sodium citrates), caffeine flavorings, and natural herbal oils representing the classical 1886 syrup secret base lock.</p>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase pt-2 tracking-wider">
                    <span>Sodium content:</span>
                    <span>40mg (1.5% RI)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENT 3: "Pairs perfectly with" section with food/recipe pairings */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="text-center md:text-left mb-12">
          <span className="text-[#E8001A] font-bold text-[10px] tracking-widest uppercase block mb-1">
            Gourmet Companions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white font-light tracking-tight">
            Pairs perfectly with...
          </h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-lg font-light">
            Elevate dynamic dinners. Refreshing sugar-free carbonation slices through oils and fatty proteins, clearing your palate with every sip.
          </p>
        </div>

        {/* Horizontal scroll of foodie cards */}
        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent snap-x">
          {FOOD_PAIRINGS.map((pair) => (
            <div 
              key={pair.id} 
              className="flex-shrink-0 w-[290px] sm:w-[320px] bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden snap-start hover:border-white transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={pair.image} 
                  alt={pair.name} 
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-102 duration-505 transition-all pb-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Score badge */}
                <span className="absolute top-4 left-4 bg-zinc-900 border border-zinc-800 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-none shadow-none">
                  {pair.matchScore}
                </span>
              </div>

              {/* Text Frame */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-white text-base uppercase tracking-tight">
                  {pair.name}
                </h3>
                <p className="text-zinc-550 text-xs leading-relaxed font-light">
                  {pair.description}
                </p>
                
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onTriggerGA4('cta_click', { label: `pair_${pair.id}_learn_more` });
                      alert(`Get local delivery order recipe bundle ingredients for "${pair.name}" paired with Coca-Cola Zero Sugar in select outlets.`);
                    }}
                    className="text-[#E8001A] hover:text-white font-bold text-[10px] tracking-widest uppercase flex items-center gap-1 focus:outline-none"
                  >
                    View Pairing Bundle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REQUIREMENT 5: Social proof strip: animated counter "Enjoyed by 200M+ people worldwide" */}
      <section className="bg-[#E8001A] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif italic text-white font-light tracking-tight">
              Shared Worldwide Refreshment
            </h2>
            <p className="text-[10px] text-red-100 font-bold tracking-widest uppercase">
              Join the thriving global community of Zero Sugar fans. Real Magic.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-1.5 justify-center mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-white fill-white" />
              ))}
              <span className="font-bold text-xs ml-1.5 text-white tracking-widest uppercase">4.9 / 5.0</span>
            </div>

            {/* Counting up value display */}
            <span className="text-3xl sm:text-4xl font-light font-mono text-white block tracking-wider">
              {counter.toLocaleString()}
            </span>
            <span className="text-[9px] text-red-105 font-bold uppercase tracking-widest mt-1">
              Satisfied Cans & Bottles enjoyed this year
            </span>
          </div>

        </div>
      </section>

      {/* REQUIREMENT 6: "You might also like" product grid at the bottom */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-12">
          <span className="text-red-500 font-bold text-[10px] tracking-widest uppercase block mb-1">
            Complementary Tastes
          </span>
          <h2 className="text-2xl md:text-4xl font-serif italic text-white font-light tracking-tight">
            You might also like...
          </h2>
          <p className="text-xs text-zinc-500 font-light mt-2">
            Broaden your horizons. These curated iconic drops pack matching dynamic refreshment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.filter(p => p.id !== 'zero-sugar').slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden p-6 hover:border-white transition-all duration-300 flex flex-col justify-between h-[360px] group"
            >
              <div>
                <div className="h-36 flex items-center justify-center relative bg-[#090909] border border-zinc-900 rounded-none p-4 overflow-hidden mb-5">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-28 object-contain transform group-hover:scale-102 duration-300 transition-transform origin-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="font-bold text-white text-base uppercase tracking-tight group-hover:text-[#E8001A] transition-colors leading-tight">
                  {item.name}
                </h3>
                <p className="text-zinc-500 text-xs font-light mt-1.5 line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center mt-5">
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                  {item.calories} per serving
                </span>

                <button
                  onClick={() => {
                    onTriggerGA4('cta_click', { label: `suggested_${item.id}_view` });
                    alert(`Hop on our Home Drinks hub to order ${item.name}! To check out high-converting interactive PDP setups, slide sizes of 'Coca-Cola Zero Sugar' page.`);
                  }}
                  className="text-red-500 font-bold text-[9px] tracking-widest uppercase hover:text-white transition-colors focus:outline-none"
                >
                  Learn profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
