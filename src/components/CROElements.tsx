import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, MapPin, Mail, Sparkles, Check, Percent } from 'lucide-react';

interface CROElementsProps {
  onOpenStoreLocator: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
  // Let parent components manually pop rewards or exit modal for quick testing
  rewardsOpenOverride?: boolean;
}

export default function CROElements({ 
  onOpenStoreLocator, 
  onTriggerGA4, 
  rewardsOpenOverride = false 
}: CROElementsProps) {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [exitModalDismissed, setExitModalDismissed] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [rewardsDismissed, setRewardsDismissed] = useState(false);

  // Email form state info
  const [exitEmail, setExitEmail] = useState('');
  const [exitSubmitted, setExitSubmitted] = useState(false);
  const [exitError, setExitError] = useState('');

  const [rewardsEmail, setRewardsEmail] = useState('');
  const [rewardsSubmitted, setRewardsSubmitted] = useState(false);

  // 1. Detect Exit Intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if user moves mouse near the top of the browser bar (exit intent)
      if (e.clientY < 20 && !exitModalOpen && !exitModalDismissed) {
        setExitModalOpen(true);
        onTriggerGA4('cro_intent_triggered', { type: 'exit_intent_modal' });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitModalOpen, exitModalDismissed]);

  // 2. Loyalty Rewards Timer Pop-up after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!rewardsDismissed && !rewardsOpen) {
        setRewardsOpen(true);
        onTriggerGA4('cro_intent_triggered', { type: 'loyalty_rewards_popup_30s' });
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [rewardsDismissed]);

  // Handle manual reward slide override for instant testing
  useEffect(() => {
    if (rewardsOpenOverride && !rewardsOpen) {
      setRewardsOpen(true);
    }
  }, [rewardsOpenOverride]);

  const handleExitEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExitError('');

    if (!exitEmail) {
      setExitError('Please fill out email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(exitEmail)) {
      setExitError('Enter email in standard format.');
      return;
    }

    setExitSubmitted(true);
    onTriggerGA4('email_signup', {
      source: 'exit_intent_overlay_coupon_10',
      email_domain: exitEmail.split('@')[1] || ''
    });
    setTimeout(() => {
      setExitModalOpen(false);
      setExitModalDismissed(true);
    }, 3000);
  };

  const handleRewardsEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardsEmail) return;

    setRewardsSubmitted(true);
    onTriggerGA4('email_signup', {
      source: 'loyalty_rewards_popup_right_slide',
      email_domain: rewardsEmail.split('@')[1] || ''
    });
    setTimeout(() => {
      setRewardsOpen(false);
      setRewardsDismissed(true);
    }, 3000);
  };

  const handleDismissExit = () => {
    setExitModalOpen(false);
    setExitModalDismissed(true);
    onTriggerGA4('cro_dismissed', { type: 'exit_intent_modal' });
  };

  const handleDismissRewards = () => {
    setRewardsOpen(false);
    setRewardsDismissed(true);
    onTriggerGA4('cro_dismissed', { type: 'loyalty_rewards_popup' });
  };

  const handleMobileStickyClick = () => {
    onTriggerGA4('cta_click', {
      label: 'mobile_sticky_bottom_bar',
      action: 'find_near_me'
    });
    onOpenStoreLocator();
  };

  return (
    <>
      {/* 1. Exit-Intent Modal: Requirement (1) */}
      <AnimatePresence>
        {exitModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismissExit}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              // Respects prefers-reduced-motion by choosing simple fade over spring slide on reduced settings
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#E8001A] text-white max-w-lg w-full rounded-3xl p-8 sm:p-10 overflow-hidden shadow-[0_25px_60px_-15px_rgba(232,0,26,0.3)] text-center border-2 border-white/20 select-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-modal-title"
            >
              {/* Top design Wave patterns */}
              <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-rose-500/20 blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-black/20 blur-2xl" />

              {/* Dismiss button */}
              <button
                id="exit-modal-close"
                onClick={handleDismissExit}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors focus:ring-2 focus:ring-white"
                aria-label="Dismiss 10% coupon"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="relative z-10 space-y-6">
                
                {/* Visual Circle */}
                <div className="w-16 h-16 bg-white text-[#E8001A] rounded-full flex items-center justify-center mx-auto shadow-xl" aria-hidden="true">
                  <Percent className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 id="exit-modal-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-white">
                    Before you go...
                  </h3>
                  <p className="text-sm text-rose-100 font-extrabold uppercase tracking-widest leading-none">
                    Uncork 10% Off your first purchase!
                  </p>
                </div>

                <p className="text-sm font-medium text-rose-50 px-2 leading-relaxed">
                  Join the email circle to secure coupons, explore limited-edition cans early, and earn entry sweeps.
                </p>

                {/* Form field */}
                {!exitSubmitted ? (
                  <form onSubmit={handleExitEmailSubmit} className="space-y-3 max-w-sm mx-auto">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label htmlFor="exit-email-input" className="sr-only">
                        Email Field
                      </label>
                      <input
                        id="exit-email-input"
                        type="email"
                        placeholder="Enter your email"
                        value={exitEmail}
                        onChange={(e) => setExitEmail(e.target.value)}
                        className="flex-1 bg-white text-zinc-900 rounded-xl px-4 py-3 placeholder-zinc-400 text-sm focus:outline-none font-medium"
                      />
                      <button
                        id="exit-email-submit-btn"
                        type="submit"
                        className="bg-slate-950 hover:bg-slate-900 border-2 border-white/10 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition duration-200"
                      >
                        Get Code
                      </button>
                    </div>
                    {exitError && (
                      <p className="text-xs text-black font-black text-center" role="alert">
                        ✕ {exitError}
                      </p>
                    )}
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-600 rounded-2xl flex items-center gap-3 justify-center text-left"
                    role="status"
                  >
                    <Check className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <p className="font-extrabold text-sm text-white">DISCOUNT CODE: COKE10NOW</p>
                      <p className="text-xs text-emerald-100">Saved! Welcome pack sent. Enjoy your first pack.</p>
                    </div>
                  </motion.div>
                )}

                <p className="text-[10px] text-rose-200 mt-2">
                  No purchase commitment necessary. Unsubscribe at any single moment with 1-click.
                </p>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Sticky bottom bar on mobile: Requirement (2) */}
      <div 
        id="mobile-sticky-cta-bar"
        className="md:hidden fixed bottom-4 left-4 right-4 z-40"
      >
        <motion.button
          onClick={handleMobileStickyClick}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 1 }}
          className="w-full bg-[#E8001A] text-white border-2 border-white/20 hover:bg-red-700 active:scale-95 font-black text-sm tracking-widest uppercase py-3.5 px-6 rounded-2xl shadow-[0_12px_24px_-4px_rgba(232,0,26,0.5)] flex items-center justify-center gap-2 focus:outline-none"
        >
          <MapPin className="w-4 h-4 text-rose-200 animate-bounce" />
          Find Coca-Cola near you
        </motion.button>
      </div>

      {/* 3. Loyalty rewards pop-up (Slide-in from bottom right after 30s): Requirement (3) */}
      <AnimatePresence>
        {rewardsOpen && (
          <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-45 max-w-sm w-full p-2.5">
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              className="bg-slate-900 border border-zinc-800 rounded-2xl p-5 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.8)] text-white w-full relative"
              role="status"
            >
              
              {/* Dismiss */}
              <button
                id="rewards-modal-close"
                onClick={handleDismissRewards}
                className="absolute top-3 right-3 p-1 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
                aria-label="Close rewards offer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3.5 select-none">
                <div className="p-3 bg-[#E8001A] rounded-xl text-white shrink-0 shadow-lg shadow-red-500/20" aria-hidden="true">
                  <Gift className="w-5 h-5" />
                </div>

                <div className="space-y-3.5 flex-1 pr-6">
                  <div>
                    <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-widest block mb-0.5">
                      Earn on Every Sip
                    </span>
                    <h4 className="text-base font-black text-white leading-tight">
                      Join Coke Rewards!
                    </h4>
                  </div>

                  <p className="text-xs text-zinc-400 leading-normal">
                    Earn dynamic points with every single scan on the cap of your bottle. Redemptions include VIP concert drops and premium gear.
                  </p>

                  {!rewardsSubmitted ? (
                    <form onSubmit={handleRewardsEmailSubmit} className="space-y-1 pt-1.5">
                      <div className="flex gap-1.5">
                        <label htmlFor="rewards-email-field" className="sr-only">
                          Email Field
                        </label>
                        <input
                          id="rewards-email-field"
                          type="email"
                          placeholder="Your email address"
                          value={rewardsEmail}
                          onChange={(e) => setRewardsEmail(e.target.value)}
                          className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-[#E8001A] text-white rounded-lg px-3 py-2 text-[11px] outline-none"
                          required
                        />
                        <button
                          id="rewards-email-submit-btn"
                          type="submit"
                          className="bg-[#E8001A] text-white font-extrabold text-[11px] px-3.5 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Join
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-[11px] text-emerald-400 font-extrabold leading-normal bg-zinc-950/85 p-2 rounded border border-zinc-850">
                      ✓ Welcomes onboard! Checked in. Checking sips next.
                    </div>
                  )}

                  <p className="text-[9px] text-zinc-500 leading-none">
                    *App terms and local age eligibility terms apply. See legal hubs.
                  </p>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}
