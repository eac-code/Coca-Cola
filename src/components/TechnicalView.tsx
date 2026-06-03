import { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Eye, FileText, Check, Copy, AlertTriangle, Monitor, Sparkles, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { SITEMAP, CustomAnalyticsEvent } from '../types';

interface TechnicalViewProps {
  analyticsEvents: CustomAnalyticsEvent[];
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
  onClearEvents: () => void;
  onTestTriggerRewards: () => void;
}

export default function TechnicalView({ 
  analyticsEvents, 
  onTriggerGA4, 
  onClearEvents,
  onTestTriggerRewards
}: TechnicalViewProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(identifier);
    onTriggerGA4('cta_click', { label: `copied_${identifier}`, target: 'technical_source_code' });
    setTimeout(() => {
      setCopiedSection(null);
    }, 2500);
  };

  const headCodeString = `<!-- Full Production <head> Optimization Template -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Indexing Meta Search Optimization -->
  <title>Coca-Cola - Open Happiness, Shared Moments & Refreshing Drinks</title>
  <meta name="description" content="Explore the iconic Coca-Cola collection, from timeless Original Taste to Coca-Cola Zero Sugar. Find stores, register for Coke Rewards, and discover recipes." />
  <meta name="keywords" content="Coca Cola, Coke Zero Sugar, Open Happiness, Beverages, Soft Drinks, Refreshment, Coke Rewards, Spencerian Script" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://www.coca-cola.com/" />

  <!-- Multi-lingual Hreflang Tags (Requirement 1) -->
  <link rel="alternate" hreflang="en" href="https://www.coca-cola.com/" />
  <link rel="alternate" hreflang="es" href="https://www.coca-cola.com/es/" />
  <link rel="alternate" hreflang="fr" href="https://www.coca-cola.com/fr/" />
  <link rel="alternate" hreflang="x-default" href="https://www.coca-cola.com/" />

  <!-- Open Graph / Slate Facebook Metadata Verification -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.coca-cola.com/" />
  <meta property="og:title" content="Coca-Cola - Open Happiness, Shared Moments & Tastes" />
  <meta property="og:description" content="Discover the timeless refreshment enjoyed across generations. Shop flavors, register recipes, and claim rewards." />
  <meta property="og:image" content="https://www.coca-cola.com/assets/images/og-share-classic.jpg" />
  <meta property="og:site_name" content="The Coca-Cola Company" />

  <!-- Twitter Card Metadata Systems -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.coca-cola.com/" />
  <meta name="twitter:title" content="Coca-Cola - Open Happiness, Shared Moments" />
  <meta name="twitter:description" content="Discover the timeless refreshment enjoyed across generations. Shop flavors, register recipes, and claim rewards." />
  <meta name="twitter:image" content="https://www.coca-cola.com/assets/images/og-share-classic.jpg" />
  <meta name="twitter:creator" content="@CocaCola" />

  <!-- Preloading Critical Above-The-Fold Assets (Eliminates LCP Lag) -->
  <link rel="preload" href="/src/assets/images/coke_hero_bottle_1780510948533.png" as="image" type="image/png" />
  
  <!-- Favicons and Icon Sets -->
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>`;

  const ga4CodeString = `<!-- Google Tag (gtag.js) GA4 Setup Snippet (Requirement 3) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-COKE1886"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Configure Measurement Core Tracker
  gtag('config', 'G-COKE1886', {
    page_path: window.location.pathname,
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  // Example Custom Product View Event Trigger Handler (Fully Responsive)
  function logProductView(productId, productName, params = {}) {
    gtag('event', 'product_view', {
      items: [{
        item_id: productId,
        item_name: productName,
        item_brand: 'Coca-Cola',
        price: 1.89
      }],
      value: 1.89,
      currency: 'USD',
      ...params
    });
  }

  // Example Custom Click Tracking Trigger Handler
  function logCTAClick(label, params = {}) {
    gtag('event', 'cta_click', {
      event_label: label,
      page_location: window.location.href,
      ...params
    });
  }

  // Example Custom Signup Event Trigger Handler
  function logEmailSignup(source, domain) {
    gtag('event', 'email_signup', {
      signup_source: source,
      user_email_domain: domain
    });
  }

  // Example Custom Store Locator Navigation Handler
  function logStoreLocatorOpen(source) {
    gtag('event', 'store_locator_open', {
      trigger_source: source
    });
  }
</script>`;

  const robotsSitemapString = `# robots.txt - Coca-Cola SEO Configuration Range (Requirement 5)
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/
Disallow: /loyalty-dashboard-private/

# Symmetrical Index Paths
Sitemap: https://www.coca-cola.com/sitemap.xml`;

  const xmlSitemapString = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated XML Sitemap (Requirement 5) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.coca-cola.com/</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.coca-cola.com/drinks</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.coca-cola.com/drinks/zero-sugar</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.coca-cola.com/rewards</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.coca-cola.com/stories</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.coca-cola.com/store-locator</loc>
    <lastmod>2026-06-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  return (
    <div className="bg-slate-900 border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl font-sans text-white select-none">
      
      {/* Console Title Banner */}
      <div className="bg-slate-950 border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-[#E8001A] text-white font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-1 shadow-md shadow-red-500/10">
            CRO Optimization Audit Dashboard
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Coca-Cola Agency Tech & Sitemap Hub
          </h2>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onTestTriggerRewards}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl transition duration-150"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Test Loyalty Popup
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        
        {/* PART 1: SITEMAP OUTLINE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E8001A]" />
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide">
              1. Coca-Cola Website Sitemap Structure
            </h3>
          </div>
          <p className="text-zinc-400 text-sm">
            Outline of all high-priority marketing pages, hierarchy mapping, and associated targeted micro-conversion funnel targets.
          </p>

          <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-slate-950/50">
            <div className="grid grid-cols-12 gap-2 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
              <div className="col-span-3">Hierarchy / Path</div>
              <div className="col-span-4">Page & Purpose Description</div>
              <div className="col-span-5">Conversion Purpose (CRO)</div>
            </div>

            <div className="divide-y divide-zinc-800 text-xs">
              {SITEMAP.map((node) => (
                <div key={node.path} className="grid grid-cols-12 gap-2 p-4 items-start hover:bg-slate-900/30 transition-colors">
                  <div className="col-span-3 space-y-1">
                    <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      node.category === 'core' ? 'bg-indigo-500/10 text-indigo-400' :
                      node.category === 'product' ? 'bg-rose-500/10 text-rose-400' :
                      node.category === 'campaign' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {node.category}
                    </span>
                    <p className="font-extrabold text-white text-sm">{node.title}</p>
                    <code className="text-zinc-500 block text-[10px] font-mono leading-none">{node.path}</code>
                  </div>

                  <div className="col-span-4 text-zinc-400 leading-normal font-medium">
                    {node.description}
                  </div>

                  <div className="col-span-5 text-[#E8001A] font-medium leading-normal bg-red-500/5 p-2 rounded border border-red-500/10">
                    {node.conversionPurpose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: REAL-TIME ANALYTICS CONSOLE (LOGS FIRE AS VISITOR USES PREVIEW) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500 animate-pulse" />
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide">
                2. Live GA4 / CRO Event Capture Logger Console
              </h3>
            </div>

            <button
              onClick={onClearEvents}
              className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition"
            >
              <RefreshCw className="w-3 h-3" />
              Clear Logger
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Click other items inside the navigation menu, hero buttons, newsletters, or PDP variants above. This live agency logger reports telemetry events fired directly into GA4 setup handlers.
          </p>

          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 font-mono text-[11px] h-[240px] overflow-y-auto space-y-2.5 select-text relative">
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest select-none">GA4 ACTIVE</span>
            </div>

            {analyticsEvents.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center text-zinc-600 gap-2 select-none">
                <p>⚡ Consoling idle... Click items within the UI to fire events (e.g. CTA buttons, variants, or signup forms).</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button 
                    onClick={() => onTriggerGA4('cta_click', { label: 'demo_test_analytics_cli', format: 'dev' })}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 font-bold text-[9px] uppercase tracking-wider rounded-md"
                  >
                    Simulate Cta Click
                  </button>
                  <button 
                    onClick={() => onTriggerGA4('store_locator_open', { format: 'fake' })}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 font-bold text-[9px] uppercase tracking-wider rounded-md"
                  >
                    Simulate Mapper Open
                  </button>
                </div>
              </div>
            ) : (
              analyticsEvents.map((log, i) => (
                <div key={i} className="pb-2 border-b border-zinc-900 last:border-0 hover:bg-zinc-900/40 p-1 rounded transition duration-150">
                  <p className="text-zinc-500 font-bold">
                    [{new Date(log.timestamp).toLocaleTimeString()}] telemetry_log_ready
                  </p>
                  <p className="text-emerald-400 font-black text-xs mt-0.5">
                    gtag("event", "<span className="underline">{log.eventName}</span>", {JSON.stringify(log.parameters, null, 1).replace(/\n/g, '')})
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PART 3: PRODUCTION <HEAD> TEMPLATE & SEO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide">
                3. HTML production &lt;head&gt; SEO Layer
              </h3>
            </div>
            
            <button
              onClick={() => handleCopy(headCodeString, 'head')}
              className="flex items-center gap-1.5 bg-slate-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition"
            >
              {copiedSection === 'head' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedSection === 'head' ? 'Copied!' : 'Copy Head'}
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Includes multi-lingual canonical variations (`hreflang` en, es, fr), strict SEO indexing limits, social Open Graph details, and Twitter card definitions.
          </p>

          <pre className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 overflow-x-auto text-[11px] leading-relaxed text-indigo-200/90 font-mono select-text max-h-[300px]">
            {headCodeString}
          </pre>
        </div>

        {/* PART 4: GOOGLE ANALYTICS 4 SCRIPT SNIPPET */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide">
                4. GA4 Measurement setup block
              </h3>
            </div>
            
            <button
              onClick={() => handleCopy(ga4CodeString, 'ga4')}
              className="flex items-center gap-1.5 bg-slate-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition"
            >
              {copiedSection === 'ga4' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedSection === 'ga4' ? 'Copied!' : 'Copy Snippet'}
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Integrates the asynchronous global measurement tracking snippet config along with custom function structures designed for e-commerce and locator funnels.
          </p>

          <pre className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 overflow-x-auto text-[11px] leading-relaxed text-zinc-300/95 font-mono select-text max-h-[250px]">
            {ga4CodeString}
          </pre>
        </div>

        {/* CORE WEB VITALS GUIDANCE STRIP */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h4 className="font-extrabold text-sm uppercase text-amber-500 tracking-wider">
              Core Web Vitals & Optimization Audits
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed font-sans text-zinc-300">
            <div className="space-y-1.5">
              <div className="text-white font-bold text-sm">Minimize CLS: Carousel</div>
              <p>Product carousel items hold static dimensions and explicit layout boundaries. Carousel slides use horizontal CSS scrolling limits to bypass layout shifts, ensuring zero layout shifts (CLS &lt; 0.05).</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-white font-bold text-sm">LCP Enhancement preloads</div>
              <p>The sweaty glass Coke Bottle is crucial for above-the-fold value. To minimize LCP render delays, the image tag calls `loading="eager"` (as opposed to lazy) linked with a preloader directive header.</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-white font-bold text-sm">Lazy Loading (LQIP)</div>
              <p>Under-the-fold images call `loading="lazy"` native directives combined with blurred low-quality image loading placeholders (LQIP) to avoid thread blockage on initial window drawing.</p>
            </div>
          </div>
        </div>

        {/* PART 5: ROBOTS AND XML SITEMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Robots.txt code block */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-zinc-405 uppercase tracking-widest block">Robots.txt</span>
              
              <button
                onClick={() => handleCopy(robotsSitemapString, 'robots')}
                className="flex items-center gap-1 hover:text-white text-zinc-400 text-[10px] font-bold uppercase transition focus:outline-none"
              >
                {copiedSection === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Code
              </button>
            </div>

            <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-[10px] leading-relaxed text-zinc-300 font-mono select-text h-[130px] overflow-y-auto">
              {robotsSitemapString}
            </pre>
          </div>

          {/* XML Sitemap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-zinc-405 uppercase tracking-widest block">Sitemap.xml Schema</span>
              
              <button
                onClick={() => handleCopy(xmlSitemapString, 'xml_sitemap')}
                className="flex items-center gap-1 hover:text-white text-zinc-400 text-[10px] font-bold uppercase transition focus:outline-none"
              >
                {copiedSection === 'xml_sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Schema
              </button>
            </div>

            <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-[10px] leading-relaxed text-zinc-300/90 font-mono select-text h-[130px] overflow-y-auto">
              {xmlSitemapString}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
