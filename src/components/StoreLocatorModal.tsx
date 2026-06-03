import React, { useState } from 'react';
import { X, Search, MapPin, Store, CheckCircle, Navigation } from 'lucide-react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerGA4: (eventName: string, params: Record<string, any>) => void;
}

export default function StoreLocatorModal({ isOpen, onClose, onTriggerGA4 }: StoreLocatorModalProps) {
  const [zipCode, setZipCode] = useState('');
  const [searched, setSearched] = useState(false);

  const mockStores = [
    {
      name: "Target Supercenter",
      address: "1450 Peachtree St NW, Atlanta, Georgia",
      distance: "0.4 miles away",
      stock: "IN STOCK (Zero Sugar, Original, Cherry)",
      hours: "Open until 10:00 PM"
    },
    {
      name: "Kroger Grocery",
      address: "800 Glenwood Ave SE, Atlanta, Georgia",
      distance: "1.2 miles away",
      stock: "IN STOCK (Zero Sugar, Original)",
      hours: "Open 24 Hours"
    },
    {
      name: "Walmart Market",
      address: "835 Martin Luther King Jr Dr NW, Atlanta, Georgia",
      distance: "2.1 miles away",
      stock: "LIMITED STOCK (Zero Sugar only)",
      hours: "Open until 11:00 PM"
    },
    {
      name: "CVS Pharmacy",
      address: "1555 Howell Mill Rd NW, Atlanta, Georgia",
      distance: "3.5 miles away",
      stock: "IN STOCK (330ml Cans, 500ml Bottles)",
      hours: "Open until 9:00 PM"
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    onTriggerGA4('cta_click', {
      label: 'store_locator_zip_search',
      search_term: zipCode
    });
  };

  const handleGetDirections = (storeName: string) => {
    onTriggerGA4('cta_click', {
      label: 'get_directions_directions_btn',
      partner: storeName
    });
    alert(`Opening navigation directions to ${storeName} for your refreshing Coca-Cola pick-up!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-105 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl z-10">
        
        {/* Header banner */}
        <div className="bg-[#E8001A] text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 rounded-full transition text-white"
            aria-label="Close Store Locator"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="text-[10px] text-white/80 font-black uppercase tracking-widest block mb-0.5">
            Local Shelf Fulfillment
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Find Coca-Cola Near You
          </h3>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <label htmlFor="locator-zip-input" className="sr-only">
                Enter ZIP or city
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="locator-zip-input"
                type="text"
                placeholder="Enter City, ZIP Code or State (e.g. 30303)"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#E8001A] font-semibold"
              />
            </div>
            <button
              id="locator-search-submit"
              type="submit"
              className="bg-[#E8001A] hover:bg-red-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition duration-150 shrink-0"
            >
              Search
            </button>
          </form>

          {/* Map & List Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[280px] md:h-[350px]">
            
            {/* List side */}
            <div className="overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
              {(searched ? mockStores : mockStores.slice(0, 2)).map((store, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl hover:border-red-500/30 transition duration-150 space-y-2"
                >
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-rose-500 shrink-0" />
                      {store.name}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-bold shrink-0">{store.distance}</span>
                  </div>

                  <p className="text-[11px] text-zinc-500">{store.address}</p>

                  <div className="pt-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-extrabold">
                      <CheckCircle className="w-3.5 h-3.5 fill-emerald-500/10 shrink-0" />
                      {store.stock}
                    </div>

                    <button
                      onClick={() => handleGetDirections(store.name)}
                      className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded text-zinc-300 hover:text-white transition"
                      aria-label="Navigate to store"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder Graphic */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 flex items-center justify-center select-none text-zinc-600">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
              
              {/* Dynamic decorative vector nodes representing landmarks */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
              
              <div className="absolute h-1 w-full bg-zinc-900 top-[40%] text-center border-t border-zinc-800/60 font-mono text-[9px] text-zinc-700">Peachtree Northwest</div>
              <div className="absolute w-1 h-full bg-zinc-900 left-[55%] border-l border-zinc-800/60" />

              {/* Atlanta Coca-Cola HQ Marker Node */}
              <div className="absolute top-[40%] left-[55%] z-10 flex flex-col items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-white flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </span>
                </span>
                <span className="text-[9px] font-black text-rose-500 uppercase bg-black px-1 rounded border border-zinc-850 mt-1 leading-none shadow-lg">Coke Headquarter</span>
              </div>

              {/* Retail store coordinates markers */}
              <div className="absolute top-[20%] left-[25%] opacity-85">
                <div className="relative flex h-3.5 w-3.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-lg">
                    <Store className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[20%] right-[25%] opacity-85">
                <div className="relative flex h-3.5 w-3.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-lg">
                    <Store className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>

              <span className="relative z-10 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 text-center select-none">
                Interactive Map Feed <br />
                <span className="text-[10px] text-zinc-600 font-semibold normal-case">GPS Geolocation Centred on Atlanta, Georgia</span>
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
