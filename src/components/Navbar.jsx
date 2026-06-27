import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, tabs }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-warm-white/80 backdrop-blur-md border-b border-border-soft transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Name */}
        <div className="flex flex-col">
          <span 
            className="font-serif text-xl font-bold tracking-tight cursor-pointer select-none text-dark-graphite"
            onClick={() => setActiveTab('about')}
          >
            WATTERSSU
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-gray mt-0.5">
            Portfolio
          </span>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center space-x-10 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-2 text-sm font-medium tracking-wider transition-colors duration-300 cursor-pointer ${
                activeTab === tab.id 
                  ? 'text-accent-terracotta' 
                  : 'text-muted-gray hover:text-dark-graphite'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-terracotta transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-dark-graphite hover:text-accent-terracotta transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden absolute top-20 left-0 right-0 bg-warm-white border-b border-border-soft transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsOpen(false);
              }}
              className={`text-left text-base font-medium py-2 tracking-wide transition-colors duration-200 cursor-pointer ${
                activeTab === tab.id 
                  ? 'text-accent-terracotta pl-2 border-l-2 border-accent-terracotta' 
                  : 'text-muted-gray hover:text-dark-graphite'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
