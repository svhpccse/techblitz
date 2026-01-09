// TECH BLITZ 2K26 - Complete Event Data
// Contains all events, paper topics, coordinators, and departments

import type { Event, DepartmentInfo, Department } from './types';

// ============================================
// TECHNICAL EVENTS (Department-wise)
// ============================================

export const TECHNICAL_EVENTS: Event[] = [
  // AUTO & MECH
  {
    id: 'cad-master',
    name: 'CAD MASTER',
    department: 'auto_mech',
    type: 'technical',
    description: 'Master computer-aided design and 3D modeling'
  },
  {
    id: 'qc-king',
    name: 'QC KING',
    department: 'auto_mech',
    type: 'technical',
    description: 'Quality Control and inspection excellence'
  },

  // CSE & AIML
  {
    id: 'code-combat',
    name: 'CODE COMBAT',
    department: 'cse_aiml',
    type: 'technical',
    description: 'Programming competition and coding challenges'
  },
  {
    id: 'ideathon',
    name: 'IDEATHON',
    department: 'cse_aiml',
    type: 'technical',
    description: 'Innovation and idea development competition'
  },

  // EEE & ECE
  {
    id: 'electro-build',
    name: 'ELECTRO BUILD',
    department: 'eee_ece',
    type: 'technical',
    description: 'Build and design electronic circuits and systems'
  },
  {
    id: 'hackathon',
    name: 'HACKATHON',
    department: 'eee_ece',
    type: 'technical',
    description: 'Intensive hardware and software development challenge'
  },

  // CIVIL
  {
    id: 'structural-art',
    name: 'STRUCTURAL ART',
    department: 'civil',
    type: 'technical',
    description: 'Structural design and architectural showcase'
  },
  {
    id: 'geoguessr',
    name: 'GEOGUESSR',
    department: 'civil',
    type: 'technical',
    description: 'Geographic information systems and mapping'
  },

  // MLT
  {
    id: 'brain-battle',
    name: 'BRAIN BATTLE',
    department: 'mlt',
    type: 'technical',
    description: 'Technical knowledge and problem-solving competition'
  },
  {
    id: 'diagnostic-data-decoder',
    name: 'DIAGNOSTIC DATA DECODER',
    department: 'mlt',
    type: 'technical',
    description: 'Medical data analysis and diagnostic excellence'
  }
];

// ============================================
// NON-TECHNICAL EVENTS (Open to all)
// ============================================

export const NON_TECHNICAL_EVENTS: Event[] = [
  {
    id: 'rhythmica',
    name: 'RHYTHMICA',
    department: 'auto_mech', // placeholder, available to all
    type: 'non_technical',
    description: 'Cultural and musical performances'
  }
];

// ============================================
// PAPER PRESENTATION TOPICS (Department-wise)
// ============================================

export const PAPER_PRESENTATION_TOPICS: Record<Department, string[]> = {
  auto_mech: [
    'Sustainability and Future Mobility Automation',
    'AI & Industry 4.0',
    'Additive Manufacturing'
  ],
  cse_aiml: [
    'AI in Space Exploration',
    'Agentic AI – The Future',
    'Blue Eye Technology'
  ],
  eee_ece: [
    'Green Power System',
    'IoT and Smart Cities',
    'AI in Power Station'
  ],
  civil: [
    'Biophilic Design',
    'Self-Healing Roads',
    'Climate-Resilient Construction'
  ],
  mlt: [
    'Lab-on-a-Chip Technology',
    'Internet of Medical Things (IoMT)',
    'Nanotechnology in Laboratory Medicine'
  ]
};

// ============================================
// COORDINATORS (Department-wise)
// ============================================

export const DEPARTMENTS_INFO: DepartmentInfo[] = [
  {
    id: 'auto_mech',
    name: 'AUTO / MECH',
    staff: [
      {
        name: 'P. Gokul Nath',
        role: 'staff',
        phone: '8870908071',
        department: 'auto_mech'
      }
    ],
    students: [
      {
        name: 'S. Dhanushkumar',
        role: 'student',
        phone: '9360273986',
        department: 'auto_mech'
      },
      {
        name: 'V. Poovarasan',
        role: 'student',
        phone: '7550375957',
        department: 'auto_mech'
      }
    ]
  },
  {
    id: 'cse_aiml',
    name: 'CSE / AIML',
    staff: [
      {
        name: 'M. Mathiyazhagan',
        role: 'staff',
        phone: '8072528882',
        department: 'cse_aiml'
      }
    ],
    students: [
      {
        name: 'M. Balamurugan',
        role: 'student',
        phone: '7603993596',
        department: 'cse_aiml'
      },
      {
        name: 'K. Ausish Kumaar',
        role: 'student',
        phone: '9940973446',
        department: 'cse_aiml'
      }
    ]
  },
  {
    id: 'eee_ece',
    name: 'EEE / ECE',
    staff: [
      {
        name: 'A. Moorthi',
        role: 'staff',
        phone: '8072490515',
        department: 'eee_ece'
      }
    ],
    students: [
      {
        name: 'S. Sathish Kumar',
        role: 'student',
        phone: '8012481721',
        department: 'eee_ece'
      },
      {
        name: 'P. Gokulapriya',
        role: 'student',
        phone: '7200724747',
        department: 'eee_ece'
      }
    ]
  },
  {
    id: 'civil',
    name: 'CIVIL',
    staff: [
      {
        name: 'M. Ruckshana',
        role: 'staff',
        phone: '7395881293',
        department: 'civil'
      }
    ],
    students: [
      {
        name: 'K. Kalaiyanan',
        role: 'student',
        phone: '8825494634',
        department: 'civil'
      },
      {
        name: 'R. Sunil',
        role: 'student',
        phone: '8488875862',
        department: 'civil'
      }
    ]
  },
  {
    id: 'mlt',
    name: 'MLT',
    staff: [
      {
        name: 'M. Sowmiya',
        role: 'staff',
        phone: '6369592816',
        department: 'mlt'
      }
    ],
    students: [
      {
        name: 'R. Kavitha',
        role: 'student',
        phone: '9360215135',
        department: 'mlt'
      },
      {
        name: 'J. Mukeshraj',
        role: 'student',
        phone: '7094329130',
        department: 'mlt'
      }
    ]
  }
];

// ============================================
// EVENT DETAILS FOR DISPLAY
// ============================================

export const EVENT_DETAILS = {
  college: 'SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE',
  location: 'Gobichettipalayam, Erode – 638 455',
  eventName: 'TECH BLITZ 2K26',
  tagline: 'A State Level Technical Symposium',
  eventDate: '30 January',
  registrationFee: '₹150',
  registrationDeadline: '27.01.2026',
  intimationDate: '28.01.2026',
  prizeWorth: '3 Lakhs',
  website: 'www.svhpc.in',
  spotRegistration: true
};

// ============================================
// EVENT RULES (Department-wise)
// ============================================

export const EVENT_RULES: Record<string, { title: string; rules: string[]; topics?: string[] }> = {
  'CAD-MASTER': {
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
  'QC-KING': {
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
  'CODE-COMBAT': {
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
  'ELECTRO-BUILD': {
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
  'STRUCTURAL-ART': {
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
  'BRAIN-BATTLE': {
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
  'DIAGNOSTIC-DATA-DECODER': {
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
    ],
    topics: [
      'Lab Report Analysis',
      'Diagnostic Data Interpretation',
      'Case Study Analysis',
      'Clinical Understanding',
      'Lab Error Identification'
    ]
  },
  'BRAIN-BATTLE-DMLT': {
    title: 'Brain Battle – Technical Quiz Event (DMLT)',
    rules: [
      'Only DMLT students can participate.',
      'Individual or teams of 2-3 students.',
      'All years can participate.',
      'College ID is compulsory.',
      'No mobile phones or gadgets allowed.',
      'Stick to time limits strictly.',
      'No cheating or misbehavior allowed.',
      'Judges decision is final.',
      'Cash Prizes and Certificates will be awarded.'
    ],
    topics: [
      'Anatomy & Physiology',
      'Biochemistry',
      'Pathology',
      'Microbiology',
      'Hematology',
      'Lab Instruments & Safety'
    ]
  },
  'Paper-Presentation': {
    title: 'Paper Presentation – Rules & Regulations',
    rules: [
      '✓ TEAM COMPOSITION: Each team must consist of exactly TWO members. Single-member or more-than-two-member teams will be rejected.',
      '✓ TOPIC SELECTION: Paper must strictly fall under the topics given by the department. Papers outside prescribed topics will be disqualified.',
      '✓ PAPER SUBMISSION: Deadline 22/01/2026 (Wednesday), 11:59 PM. Late submissions will NOT be considered. PDF format only.',
      '✓ FILE FORMAT: PaperPresentation_TeamLeaderName_CollegeName.pdf',
      '✓ PAPER FORMAT: Maximum 6 pages, minimum 4 pages (excluding references). Font: Times New Roman. Title – 14 (Bold), Headings – 12 (Bold), Content – 12. Line spacing: 1.5',
      '✓ PAPER CONTENT: Proper abstract, keywords, introduction, methodology, results, conclusion, and references are mandatory.',
      '✓ PLAGIARISM: Plagiarism above 20% will lead to immediate rejection.',
      '✓ SELECTION PROCESS: Papers evaluated on Relevance to topic, Technical content, Clarity and originality, Presentation structure.',
      '✓ INTIMATION DATE: Selected teams will be notified on 27/01/2026 (Monday) via email/WhatsApp.',
      '✓ PRESENTATION TIME: 8 minutes for presentation + 2 minutes for Q&A. Teams exceeding time limits will be stopped abruptly.',
      '✓ PRESENTATION MATERIAL: PPT/PPTX format only. Maximum 12 slides (excluding title and thank-you slide). Bring PPT in both pen drive and email backup.',
      '✓ PARTICIPATION REQUIREMENTS: Carry College ID card and Symposium registration confirmation. Both team members must be present.',
      '✓ ORIGINALITY & DISCIPLINE: Copied or AI-generated papers will be caught during Q&A. Any misconduct will lead to disqualification.',
      '✓ NO MOBILE PHONES: Use of mobile phones during presentation is strictly prohibited.',
      '✓ CERTIFICATES & AWARDS: Certificates provided only to participants who present. Winners decided on Paper quality, Presentation skill, and Q&A ability.',
      '✓ GENERAL INSTRUCTIONS: Reporting time will be informed with selection results. Participants must strictly follow the schedule.',
      '✓ COMMITTEE RESERVES RIGHT: The organizing committee reserves the right to modify rules if necessary.'
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
  'Paper-Presentation-Civil': {
    title: 'Paper Presentation – Civil Engineering',
    rules: [
      '📚 TOPICS: Biophilic Design (Integrating nature in design), Self-Healing Roads (Innovative road technology), Climate-Resilient Construction (Sustainable building practices)',
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
  }
};

// ============================================
// DEPARTMENT LOGOS (For display icons section)
// ============================================

export const DEPARTMENT_LOGOS = [
  { name: 'Civil Engineering', icon: '🏗️' },
  { name: 'Mechanical Engineering', icon: '⚙️' },
  { name: 'Automobile Engineering', icon: '🚗' },
  { name: 'Electrical & Electronics', icon: '⚡' },
  { name: 'Electronics & Communication', icon: '📡' },
  { name: 'Computer Engineering', icon: '💻' },
  { name: 'Science & Humanities', icon: '📚' },
  { name: 'SVHPC', icon: '🎓' }
];
