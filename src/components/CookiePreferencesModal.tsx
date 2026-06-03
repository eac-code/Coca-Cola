import { useState } from 'react';
import { X, Shield, ToggleLeft, ToggleRight } from 'lucide-react';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function CookiePreferencesModal({ isOpen, onClose, onTriggerGA4 }: CookiePreferencesModalProps) {
  const [cookies, setCookies] = useState({
    essential: true, // Permanent
    performance: true, // GA4
    marketing: false // Advertising
  });

  const handleSave = () => {
    onTriggerGA4('cookie_preferences_saved', {
      performance_enabled: cookies.performance,
      marketing_enabled: cookies.marketing
    });
    alert("Your Coca-Cola Privacy Preferences have been logged and recorded. Consent flags updated successfully.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-105 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl z-10 select-none">
        <div className="p-6 space-y-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#E8001A]" />
              Privacy Preferences
            </h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-zinc-800 rounded-full transition text-zinc-400"
              aria-label="Close preferences"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            The Coca-Cola Company uses cookies to optimize your overall user experience, deliver social proof, and track campaign conversions. Configure settings below.
          </p>

          <div className="space-y-4 pt-2">
            {/* Essential */}
            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-850">
              <div>
                <span className="font-extrabold text-sm block">Essential Cookies</span>
                <span className="text-[10px] text-zinc-500 block leading-tight">Necessary for local checkout, state management, and exit overlays.</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 font-bold px-2.5 py-1 rounded">REQUIRED</span>
            </div>

            {/* Performance */}
            <div 
              onClick={() => setCookies({ ...cookies, performance: !cookies.performance })}
              className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-850 cursor-pointer hover:border-zinc-700 transition"
            >
              <div>
                <span className="font-extrabold text-sm block">Performance & Telemetry</span>
                <span className="text-[10px] text-zinc-500 block leading-tight">Powers custom GA4 tracking logs and event monitors.</span>
              </div>
              {cookies.performance ? (
                <ToggleRight className="w-8 h-8 text-[#E8001A]" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-zinc-600" />
              )}
            </div>

            {/* Marketing */}
            <div 
              onClick={() => setCookies({ ...cookies, marketing: !cookies.marketing })}
              className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-850 cursor-pointer hover:border-zinc-700 transition"
            >
              <div>
                <span className="font-extrabold text-sm block">Marketing Cookies</span>
                <span className="text-[10px] text-zinc-500 block leading-tight">Tracks cross-domain campaign performance and discount referrals.</span>
              </div>
              {cookies.marketing ? (
                <ToggleRight className="w-8 h-8 text-[#E8001A]" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-zinc-600" />
              )}
            </div>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => {
                setCookies({ essential: true, performance: true, marketing: true });
                onTriggerGA4('cookie_preferences_saved', { all_accepted: true });
                alert("All cookies and telemetry tags accepted.");
                onClose();
              }}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs uppercase py-3 rounded-xl transition"
            >
              Accept All
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#E8001A] hover:bg-red-700 text-white font-extrabold text-xs uppercase py-3 rounded-xl transition"
            >
              Save Choices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
