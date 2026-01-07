import { useState } from 'react';
import { Header, Hero, Events, Coordinators, RegistrationForm, Footer } from './components';
import type { Department } from './types';
import './App.css';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ name: string; department: Department } | undefined>(
    undefined
  );

  const handleRegisterClick = () => {
    setSelectedEvent(undefined);
    setIsRegistrationOpen(true);
  };

  const handleEventSelect = (eventName: string, department: Department) => {
    setSelectedEvent({ name: eventName, department });
    setIsRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setIsRegistrationOpen(false);
    setSelectedEvent(undefined);
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
