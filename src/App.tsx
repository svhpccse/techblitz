import { useState } from 'react';
import { Header, Hero, Events, Coordinators, RegistrationPage, Footer } from './components';
import { EventRulesModal } from './components/EventRulesModal';
import type { Department } from './types';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register'>('home');
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; department: Department } | undefined>(
    undefined
  );
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState<string | null>(null);

  const handleRegisterClick = () => {
    setSelectedEvent(undefined);
    setRulesModalOpen(false);
    setCurrentPage('register');
  };

  const handleEventSelect = (eventName: string, department: Department) => {
    setSelectedEventName(eventName);
    setSelectedEvent({ name: eventName, department });
    setRulesModalOpen(true);
  };

  const handleRulesModalClose = () => {
    setRulesModalOpen(false);
    setSelectedEventName(null);
  };

  const handleRegisterFromRules = () => {
    handleRulesModalClose();
    setCurrentPage('register');
  };

  const handleNavigateBack = () => {
    setCurrentPage('home');
    setSelectedEvent(undefined);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {currentPage === 'register' ? (
        <>
          <RegistrationPage onNavigateBack={handleNavigateBack} initialEvent={selectedEvent} />
        </>
      ) : (
        <>
          {/* Navigation Header */}
          <Header onRegisterClick={handleRegisterClick} />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <Hero onRegisterClick={handleRegisterClick} />

            {/* Events Section */}
            <Events onEventSelect={handleEventSelect} />

            {/* Coordinators Section */}
            <Coordinators />
          </main>

          {/* Footer */}
          <Footer />

          {/* Event Rules Modal */}
          <EventRulesModal
            isOpen={rulesModalOpen}
            eventName={selectedEventName}
            onClose={handleRulesModalClose}
            onRegisterClick={handleRegisterFromRules}
          />
        </>
      )}
    </div>
  );
}

export default App;
