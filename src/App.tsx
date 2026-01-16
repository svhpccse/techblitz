import { useState } from 'react';
import { Header, Hero, Events, Coordinators, RegistrationForm, Footer } from './components';
import { EventRulesModal } from './components/EventRulesModal';
import type { Department } from './types';
import './App.css';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; department: Department } | undefined>(
    undefined
  );
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState<string | null>(null);

  const handleRegisterClick = () => {
    setSelectedEvent(undefined);
    setRulesModalOpen(false);
    setIsRegistrationOpen(true);
  };

  const handleEventSelect = (eventName: string, department: Department) => {
    setSelectedEventName(eventName);
    setSelectedEvent({ name: eventName, department });
    setRulesModalOpen(true);
  };

  const handleRegistrationClose = () => {
    setIsRegistrationOpen(false);
    setSelectedEvent(undefined);
  };

  const handleRulesModalClose = () => {
    setRulesModalOpen(false);
    setSelectedEventName(null);
  };

  const handleRegisterFromRules = () => {
    handleRulesModalClose();
    setIsRegistrationOpen(true);
  };

  return (
    <div className="app">
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

      {/* Registration Modal */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={handleRegistrationClose}
        initialEvent={selectedEvent}
      />
    </div>
  );
}

export default App;
