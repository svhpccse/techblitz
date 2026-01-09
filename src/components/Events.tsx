// Events Display Component
// Shows all technical events organized by department

import { TECHNICAL_EVENTS, DEPARTMENTS_INFO, PAPER_PRESENTATION_TOPICS } from '../data';
import type { Department } from '../types';
import './Events.css';
import { ChevronRight } from 'lucide-react';

// ============================================
// HARDCODED EVENT RULES
// ============================================

const EVENT_RULES: Record<string, { title: string; rules: string[] }> = {
  'CAD MASTER': {
    title: 'CAD MASTER',
    rules: [
      'Diploma students from Engineering and Technology streams',
      'Open to all years (First, Second, and Third Year)',
      'Participants can take part as individuals',
      'Basic knowledge of Engineering Drawing and CAD software is preferred',
      'Event will be conducted individually',
      'Maximum 2D drawings and basic 3D models using standard CAD software',
      'Demonstrate proficiency in creating accurate technical drawings',
      'Creativity, technical accuracy, and practical application of engineering drawing concepts will be evaluated'
    ]
  },
  'QC KING': {
    title: 'Quality Control (QC) King - Mech & Auto Event',
    rules: [
      'Mechanical and Automobile Students only',
      'Participation can be individual only',
      'To measure the product dimensions for mechanical components',
      'Based on Metrology Related QC',
      'Use of mobile phones, smart watches, or electronic gadgets is strictly prohibited',
      'Extra time will not be provided',
      'Clarity in technical explanation is required',
      'Participants should report 30 minutes before the event starts',
      'Event coordinators reserve the right to modify rules if necessary',
      'Participants must maintain discipline and professionalism throughout the event',
      'Time will be allotted on the spot',
      'Coordinator decision is final',
      'Cash Prize and Participation certificates will be provided to all registered participants'
    ]
  },
  'CODE COMBAT': {
    title: 'CODE COMBAT Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Programming languages allowed: C, C++, Java, Python.',
      'Duration: 90 minutes.',
      'Multiple programming problems will be provided.',
      'Solutions will be tested against test cases.',
      'Time and correctness of submission will determine ranking.',
      'Online judges will be used for code evaluation.'
    ]
  },
  'IDEATHON': {
    title: 'IDEATHON Rules',
    rules: [
      'Teams can have up to 3 members.',
      'Participants must present an innovative idea with a working prototype or detailed presentation.',
      'Duration: 10 minutes presentation + 5 minutes Q&A.',
      'Idea must be feasible and technically sound.',
      'Plagiarism of any kind is not allowed.',
      'Judging will be based on innovation, feasibility, and presentation quality.',
      'Submission deadline: 27.01.2026'
    ]
  },
  'ELECTRO BUILD': {
    title: 'Electro Build (DEEE Event)',
    rules: [
      'DEEE students can participate',
      'Team participation: 2 members',
      'Design a circuit based on given problem statement',
      'Make a connection based on your circuit',
      'Verify the circuit',
      'No mobile phones allowed',
      'Should be finished within given time',
      'Tests practical skills and designing capabilities',
      'Judges\' decision is final',
      'Cash Prizes and Certificates will be awarded'
    ]
  },
  'HACKATHON': {
    title: 'HACKATHON Rules',
    rules: [
      'Teams can have up to 3 members.',
      'Duration: 4 hours (including project finalization and demo).',
      'Problem statement will be provided at the event.',
      'Internet access will be provided.',
      'Use of pre-built libraries and frameworks is allowed.',
      'Final submission must include code and documentation.',
      'Team must demonstrate working functionality.'
    ]
  },
  'STRUCTURAL ART': {
    title: 'Structural Art',
    rules: [
      'Open to civil engineering students',
      'Individual participation only',
      'Design and showcase civil engineering skills using SketchUp/Revit',
      'Create a 3D model of a given structure or site',
      'Problem statement will be provided on the spot',
      'Time limit: 1-2 hours',
      'Tests modeling skills, creativity, and attention to detail',
      'No external help or mobile phones allowed during the event',
      'Models will be evaluated based on accuracy, creativity, and presentation',
      'Judges\' decision is final',
      'Cash Prizes and Certificates will be awarded',
      'Opportunity to showcase your work'
    ]
  },
  'GEOGUESSR': {
    title: 'GeoGuesser',
    rules: [
      'Open to civil engineering students',
      'Individual participation only',
      'Test your knowledge of geography and civil engineering landmarks',
      'Identify locations and structures from around the world',
      'Images of civil engineering structures, landmarks, or locations will be shown',
      'Identify the location, structure, or landmark within the given time limit',
      'Points will be awarded based on accuracy and speed',
      'No external help or mobile phones allowed during the event',
      'Judges\' decision is final',
      'Round 1: Identify 10 structures/landmarks (easy level)',
      'Round 2: Identify 5 structures/landmarks (medium level)',
      'Round 3: Identify 3 structures/landmarks (hard level)',
      'Cash Prizes and Certificates will be awarded',
      'Bragging rights to the winners'
    ]
  },
  'BRAIN BATTLE': {
    title: 'BRAIN BATTLE Rules',
    rules: [
      'Participants: Individual participation.',
      'Duration: 60 minutes.',
      'Multiple choice and short answer questions.',
      'Topics include general technical knowledge and problem-solving.',
      'Top scorers will advance to the next round.',
      'Negative marking may apply for incorrect answers.',
      'Final round will be a rapid-fire Q&A session.'
    ]
  },
  'DIAGNOSTIC DATA DECODER': {
    title: 'Diagnostics Data Decoder (DMLT Event)',
    rules: [
      'DMLT students - Individual or team participation.',
      'Decode lab reports, values, and case data.',
      'Identify errors, abnormalities, or diagnoses.',
      'Apply DMLT knowledge to real lab scenarios.',
      'Time-bound analysis required.',
      'No mobile phones allowed.',
      'Judges decision is final.',
      'Cash Prizes and Certificates will be awarded.'
    ]
  },
  'RHYTHMICA': {
    title: 'RHYTHMICA Rules',
    rules: [
      'Teams can have 2-6 members.',
      'Performance duration: 4-6 minutes.',
      'Music tracks must be submitted in MP3 format before event.',
      'Performance can be any dance style (classical, contemporary, folk, hip-hop).',
      'Stage presence and choreography will be judged.',
      'All team members must be present during performance.',
      'Use of props is allowed (must be self-arranged).'
    ]
  },
  'Paper Presentation: Biophilic Design': {
    title: 'Paper Presentation – Civil Engineering: Biophilic Design',
    rules: [
      '📚 TOPIC: Biophilic Design - Integrating nature in design',
      '✓ ELIGIBILITY: Open to civil engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  },
  'Paper Presentation: Self-Healing Roads': {
    title: 'Paper Presentation – Civil Engineering: Self-Healing Roads',
    rules: [
      '📚 TOPIC: Self-Healing Roads - Innovative road technology',
      '✓ ELIGIBILITY: Open to civil engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  },
  'Paper Presentation: Climate - Resilient Construction': {
    title: 'Paper Presentation – Civil Engineering: Climate-Resilient Construction',
    rules: [
      '📚 TOPIC: Climate-Resilient Construction - Sustainable building practices',
      '✓ ELIGIBILITY: Open to civil engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  },
  'Paper Presentation: Sustainability and Future Mobility Automation': {
    title: 'Paper Presentation – Auto/Mech Engineering: Sustainability and Future Mobility Automation',
    rules: [
      '📚 TOPIC: Sustainability and Future Mobility Automation',
      '✓ ELIGIBILITY: Open to Auto/Mech engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  },
  'Paper Presentation: AI & Industry 4.0': {
    title: 'Paper Presentation – Auto/Mech Engineering: AI & Industry 4.0',
    rules: [
      '📚 TOPIC: AI & Industry 4.0',
      '✓ ELIGIBILITY: Open to Auto/Mech engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  },
  'Paper Presentation: Additive Manufacturing': {
    title: 'Paper Presentation – Auto/Mech Engineering: Additive Manufacturing',
    rules: [
      '📚 TOPIC: Additive Manufacturing',
      '✓ ELIGIBILITY: Open to Auto/Mech engineering students (individual or team of 2)',
      '✓ ABSTRACT SUBMISSION: Max 250 words by 27.01.2026',
      '✓ FULL PAPER SUBMISSION: By 28.01.2026',
      '✓ PRESENTATION TIME: 10-15 minutes including Q&A',
      '✓ PRESENTATION FORMAT: PowerPoint only',
      '✓ ORIGINALITY: Original work only; plagiarism will lead to disqualification',
      '✓ EVALUATION CRITERIA: Content (40%) - originality, relevance, technical depth. Presentation (30%) - clarity, organization, communication. Q&A (30%) - understanding, response',
      '✓ OUTCOME: Cash Prizes and Certificates',
      '✓ IMPORTANT DATES: Abstract submission: 27.01.2026, Full paper submission: 28.01.2026, Presentation: 30.01.2026',
      '✓ JUDGES DECISION: Final and binding'
    ]
  }
};

interface EventsProps {
  onEventSelect: (eventName: string, department: Department, rules?: { title: string; rules: string[] }) => void;
}

export const Events = ({ onEventSelect }: EventsProps) => {
  // Group technical events by department
  const eventsByDepartment = TECHNICAL_EVENTS.reduce(
    (acc, event) => {
      if (!acc[event.department]) {
        acc[event.department] = [];
      }
      acc[event.department].push(event);
      return acc;
    },
    {} as Record<Department, typeof TECHNICAL_EVENTS>
  );

  const departments = DEPARTMENTS_INFO;

  // Helper function to get event rules
  const getEventRules = (eventName: string) => {
    return EVENT_RULES[eventName] || null;
  };

  return (
    <section id="events" className="events-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Events & Competitions</h2>
          <p className="section-subtitle">
            Explore exciting technical and non-technical events across all departments
          </p>
        </div>

        {/* Events by Department */}
        <div className="departments-grid">
          {departments.map((dept) => (
            <div key={dept.id} className="department-card">
              <div className="dept-header">
                <h3 className="dept-name">{dept.name}</h3>
                <div className="dept-icon">🏢</div>
              </div>

              {/* Technical Events */}
              <div className="events-list">
                {eventsByDepartment[dept.id] && eventsByDepartment[dept.id].length > 0 ? (
                  <>
                    <div className="events-category">
                      <p className="category-label">Technical Events</p>
                      {eventsByDepartment[dept.id].map((event) => (
                        <button
                          key={event.id}
                          className="event-item"
                          onClick={() => onEventSelect(event.name, event.department, getEventRules(event.name))}
                        >
                          <span className="event-name">{event.name}</span>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Paper Presentation Topics */}
                <div className="events-category">
                  <p className="category-label">Paper Presentation Topics</p>
                  <div className="papers-list">
                    {PAPER_PRESENTATION_TOPICS[dept.id].map((topic, idx) => (
                      <button
                        key={idx}
                        className="paper-item"
                        onClick={() => onEventSelect(`Paper Presentation: ${topic}`, dept.id)}
                      >
                        <span className="paper-icon">📄</span>
                        <span className="paper-topic">{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Technical Events */}
        <div className="non-technical-section">
          <h3 className="non-tech-title">Non-Technical Events</h3>
          <div className="non-tech-events">
            <div className="event-card">
              <div className="event-card-icon">🎵</div>
              <h4>RHYTHMICA</h4>
              <p>Cultural and dance performances - Open to all departments</p>
              <button
                className="btn btn-primary btn-small"
                onClick={() => onEventSelect('RHYTHMICA', 'auto_mech', getEventRules('RHYTHMICA'))}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
