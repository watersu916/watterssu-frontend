import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Activities from './components/Activities';
import Contact from './components/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'activities', label: 'Activities' },
    { id: 'contact', label: 'Contact' }
  ];

  // Helper to change main active tab and reset project drill-down state
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedProjectId(null);
  };

  // Render the matching category view
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutMe />;
      case 'projects':
        if (selectedProjectId) {
          return (
            <ProjectDetail 
              projectId={selectedProjectId} 
              onBack={() => setSelectedProjectId(null)} 
            />
          );
        }
        return <Projects onSelectProject={setSelectedProjectId} />;
      case 'activities':
        return <Activities />;
      case 'contact':
        return <Contact />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col selection:bg-accent-terracotta/20 selection:text-accent-terracotta">
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        tabs={tabs} 
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* Footer Section */}
      <footer className="border-t border-border-soft py-12 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-gray space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Ansuyeon. All rights reserved.</p>
          <div className="flex flex-col md:items-end text-center md:text-right space-y-1">
            <p>Designed with off-white typography hierarchy.</p>
            <p className="font-medium text-[10px] uppercase tracking-wider text-accent-terracotta">
              React + Tailwind CSS • Containerized on k3s • ArgoCD GitOps
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
