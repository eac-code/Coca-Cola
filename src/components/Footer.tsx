import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Check, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCookieConsent: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function Footer({ onOpenCookieConsent, onTriggerGA4 }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    onTriggerGA4('email_signup', {
      source: 'footer_newsletter_reprompt',
      email_domain: email.split('@')[1] || ''
    });
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const handleSocialClick = (platform: string) => {
    onTriggerGA4('cta_click', {
      label: `footer_social_${platform}`,
      platform
    });
  };

  return (
    <footer id="global-site-footer" className="relative bg-[#0F0F0F] text-slate-300 overflow-hidden font-sans">
      
      {/* Dynamic Red Wave SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 bg-transparent">
        <svg 
          className="relative block w-full h-[30px] md:h-[50px] fill-[#E8001A]"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Products */}
          <div className="space-y-4">
            <h3 id="footer-hdr-products" className="text-white font-bold text-sm tracking-wider uppercase mb-1">
              Our Products
            </h3>
            <ul className="space-y-2.5 text-sm" aria-labelledby="footer-hdr-products">
              <li>
                <a href="#classic-original" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded" aria-label="Explore Coca-Cola Original Taste">
                  Coca-Cola Original
                </a>
              </li>
              <li>
                <a href="#zero-sugar" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded" aria-label="Explore Coca-Cola Zero Sugar">
                  Coca-Cola Zero Sugar
                </a>
              </li>
              <li>
                <a href="#cherry" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded" aria-label="Explore Coca-Cola Cherry flavoring">
                  Coca-Cola Cherry
                </a>
              </li>
              <li>
                <a href="#creations" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded" aria-label="Check out modern Coca-Cola Creations line">
                  Coca-Cola Creations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company Info */}
          <div className="space-y-4">
            <h3 id="footer-hdr-company" className="text-white font-bold text-sm tracking-wider uppercase mb-1">
              Company & Impact
            </h3>
            <ul className="space-y-2.5 text-sm" aria-labelledby="footer-hdr-company">
              <li>
                <a href="#about" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded">
                  About The Coca-Cola Company
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded">
                  Our 1886 Heritage
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded">
                  A World Without Waste (Sustainability)
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white hover:underline transition-colors focus:outline-2 focus:outline-white rounded">
                  Careers & Diversity
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us Socials */}
          <div className="space-y-4">
            <h3 id="footer-hdr-socials" className="text-white font-bold text-xs tracking-widest uppercase mb-1">
              Follow Us
            </h3>
            <div className="flex space-x-2" aria-labelledby="footer-hdr-socials">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => handleSocialClick('Facebook')}
                className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-[#E8001A] text-white hover:text-white rounded-none transition-all duration-300"
                aria-label="Follow Coca-Cola on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => handleSocialClick('Twitter')}
                className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-[#E8001A] text-white hover:text-white rounded-none transition-all duration-300"
                aria-label="Follow Coca-Cola on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => handleSocialClick('Instagram')}
                className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-[#E8001A] text-white hover:text-white rounded-none transition-all duration-300"
                aria-label="Follow Coca-Cola on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => handleSocialClick('Youtube')}
                className="p-3 bg-zinc-950 border border-zinc-800 hover:bg-[#E8001A] text-white hover:text-white rounded-none transition-all duration-300"
                aria-label="Follow Coca-Cola on YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed pt-2 font-light">
              Join the conversation online. Tag your special Coke moments with <span className="text-[#E8001A] font-medium">#OpenHappiness</span> or <span className="text-[#E8001A] font-medium">#RealMagic</span>!
            </p>
          </div>

          {/* Column 4: Newsletter Re-Prompt */}
          <div className="space-y-4">
            <h3 id="footer-hdr-newsletter" className="text-white font-bold text-xs tracking-widest uppercase mb-1">
              Never Miss A Drop
            </h3>
            <p className="text-sm font-light text-zinc-400">
              Subscribe to unlock local sweepstakes, new drop releases, and personalized rewards.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:outline-none transition-all"
                  disabled={subscribed}
                />
                <button
                  id="footer-newsletter-submit"
                  type="submit"
                  className="bg-[#E8001A] hover:bg-white hover:text-black hover:border-white border border-transparent disabled:bg-emerald-700 text-white font-bold tracking-widest text-[10px] uppercase px-5 py-2.5 rounded-none transition-colors duration-250 focus:outline-none"
                  disabled={subscribed}
                >
                  {subscribed ? <Check className="w-4 h-4 mx-auto" /> : 'Sign Up'}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-500 font-medium animate-pulse" role="alert">
                  {error}
                </p>
              )}
              {subscribed && (
                <p className="text-xs text-emerald-400 font-medium" role="status">
                  Success! Welcome to Coca-Cola. Welcome pack sent.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Lower Footer Area */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6 text-xs text-zinc-500">
          
          {/* Copyright line */}
          <div className="text-center md:text-left">
            <p>© 2026 The Coca-Cola Company. All Rights Reserved.</p>
            <p className="flex items-center justify-center md:justify-start gap-1 mt-1">
              Made with <Heart className="w-3 h-3 text-[#E8001A] fill-[#E8001A]" /> for shared magic around the world.
            </p>
          </div>

          {/* Legal / Consent buttons */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button 
              id="cookie-pref-btn"
              onClick={() => {
                onTriggerGA4('cta_click', { label: 'footer_cookie_preferences' });
                onOpenCookieConsent();
              }}
              className="hover:text-white underline transition-colors focus:outline-none"
            >
              Cookie Settings
            </button>
            <a href="#privacy" className="hover:text-white hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white hover:underline">
              Terms of Use
            </a>
            <a href="#accessibility" className="hover:text-white hover:underline">
              Accessibility Statement
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
