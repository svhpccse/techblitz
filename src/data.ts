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
