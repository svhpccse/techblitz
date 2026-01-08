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
    title: 'CAD MASTER Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Participants will be given 60 minutes to complete the CAD modeling task.',
      'A laptop/workstation with CAD software (AutoCAD/SolidWorks) will be provided.',
      'Participants must follow the design specifications provided.',
      'Quality of the model and accuracy will be judged.',
      'Use of reference materials is not allowed.'
    ]
  },
  'QC-KING': {
    title: 'QC KING Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Event duration: 45 minutes.',
      'Participants will be given components to inspect for quality.',
      'Identification of defects and proper documentation is required.',
      'Accuracy and speed in identifying defects will be judged.',
      'A checklist will be provided for quality parameters.'
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
    title: 'ELECTRO BUILD Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Build an electronic circuit based on given specifications.',
      'Duration: 120 minutes.',
      'Components will be provided.',
      'Circuit must be functional and meet all specifications.',
      'Proper soldering and documentation is required.',
      'Safety regulations must be followed at all times.'
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
    title: 'STRUCTURAL ART Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Design and present a structural solution to a given problem.',
      'Duration: 120 minutes design + 10 minutes presentation.',
      'Design software or manual drawings are acceptable.',
      'Design must follow civil engineering principles.',
      'Presentation should include analysis and justification.',
      'Feasibility and innovation will be judged.'
    ]
  },
  'GEOGUESSR': {
    title: 'GEOGUESSR Rules',
    rules: [
      'Participants: Individual or teams of 2.',
      'Duration: 60 minutes.',
      'GIS software will be provided.',
      'Participants must answer geographic and mapping questions.',
      'Accuracy and speed will determine the ranking.',
      'Use of reference materials is not allowed.'
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
    title: 'Paper Presentation Rules',
    rules: [
      'Teams can have up to 2 members.',
      'Abstract of 200-300 words must be submitted before deadline (27.01.2026).',
      'Presentation duration: 5-8 minutes + 2-3 minutes Q&A.',
      'Presentations can be in English or Tamil.',
      'Presentation file must be brought on pendrive or email.',
      'Topics are provided in the list below.',
      'Judges decision is final and binding.'
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
