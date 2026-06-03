import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomepageSections from './components/HomepageSections';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import CROElements from './components/CROElements';
import TechnicalView from './components/TechnicalView';
import StoreLocatorModal from './components/StoreLocatorModal';
import CookiePreferencesModal from './components/CookiePreferencesModal';
import { CustomAnalyticsEvent } from './types';

// Entry controller of the Coca-Cola Marketing Platform
export default function App() {
  const [currentView, setView] = useState<'home' | 'pdp' | 'sitemap'>('home');
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [cookieConsentOpen, setCookieConsentOpen] = useState(false);
  const [analyticsEvents, setAnalyticsEvents] = useState<CustomAnalyticsEvent[]>([]);

  // Override trigger state to test the loyalty rewards popup instantly
  const [loyaltyOverrideTriggered, setLoyaltyOverrideTriggered] = useState(false);

  // Trigger simulated telemetry events into our live developer consoling dashboard
  const handleTriggerGA4 = (eventName: string, params: Record<string, any> = {}) => {
    const rawTimestamp = new Date().toISOString();
    const newLog: CustomAnalyticsEvent = {
      timestamp: rawTimestamp,
      eventName,
      parameters: {
        ...params,
        captured_via: 'Simulated Measurement Protocol (GA4)',
        page_view_scope: currentView
      }
    };
    setAnalyticsEvents((prev) => [newLog, ...prev]);
  };

  const clearAnalyticsEvents = () => {
    setAnalyticsEvents([]);
  };

  const handleTestRewardsPopup = () => {
    setLoyaltyOverrideTriggered(true);
    handleTriggerGA4('cro_intent_triggered', { type: 'manual_tester_rewards_trigger' });
    
    // Auto reset the toggle flag shortly after so it can trigger again
    setTimeout(() => {
      setLoyaltyOverrideTriggered(false);
    }, 1000);
  };

  return (
    <div id="coca-cola-application-root" className="min-h-screen bg-white text-slate-950 selection:bg-[#E8001A] selection:text-white font-sans antialiased flex flex-col justify-between">
      
      {/* 1. Accessible Skip Navigation Link */}
      <a 
        href="#main-content-target" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#E8001A] text-white px-6 py-3.5 rounded-none font-bold z-100 uppercase text-xs tracking-widest border border-zinc-200"
      >
        Skip to main content
      </a>

      {/* 2. Global Navigation */}
      <Navbar 
        currentView={currentView}
        setView={(view) => {
          setView(view);
          handleTriggerGA4('page_view', { page_location: `/${view === 'home' ? '' : view}` });
        }}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onOpenLoyaltyModal={() => setLoyaltyOverrideTriggered(true)}
        onTriggerGA4={handleTriggerGA4}
      />

      {/* 3. Primary Main Content Slot */}
      <main id="main-content-target" className="flex-grow">
        
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Full screen hero section with animated Sweating Cold Bottle (Requirement 1-6) */}
            <Hero 
              onExploreDrinks={() => {
                const drinksSection = document.getElementById('products-carousel-section');
                if (drinksSection) {
                  drinksSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onOpenStoreLocator={() => setStoreLocatorOpen(true)}
              onTriggerGA4={handleTriggerGA4}
            />

            {/* Additional Homepage Sections A, B, C, D */}
            <HomepageSections 
              onSelectProduct={(id) => {
                if (id === 'zero-sugar') setView('pdp');
              }}
              onTriggerGA4={handleTriggerGA4}
            />
          </div>
        )}

        {currentView === 'pdp' && (
          <ProductDetail 
            onOpenStoreLocator={() => setStoreLocatorOpen(true)}
            onTriggerGA4={handleTriggerGA4}
          />
        )}

        {currentView === 'sitemap' && (
          <div className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sitemap Outline & SEO audit logs (Requirement 7 & Sitemap requirements) */}
            <TechnicalView 
              analyticsEvents={analyticsEvents}
              onTriggerGA4={handleTriggerGA4}
              onClearEvents={clearAnalyticsEvents}
              onTestTriggerRewards={handleTestRewardsPopup}
            />
          </div>
        )}

      </main>

      {/* 4. Global Footer Section */}
      <Footer 
        onOpenCookieConsent={() => setCookieConsentOpen(true)}
        onTriggerGA4={handleTriggerGA4}
      />

      {/* 5. CRO Elements (Exit overlay coupon, Mobile Sticky Bottom, Loyalty Timer pop-up) */}
      <CROElements 
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onTriggerGA4={handleTriggerGA4}
        rewardsOpenOverride={loyaltyOverrideTriggered}
      />

      {/* 6. Modals (Store Locator map, GDPR Privacy consents preferences) */}
      <StoreLocatorModal 
        isOpen={storeLocatorOpen}
        onClose={() => setStoreLocatorOpen(false)}
        onTriggerGA4={handleTriggerGA4}
      />

      <CookiePreferencesModal 
        isOpen={cookieConsentOpen}
        onClose={() => setCookieConsentOpen(false)}
        onTriggerGA4={handleTriggerGA4}
      />

    </div>
  );
}
