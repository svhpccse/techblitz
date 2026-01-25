// TypeScript Types and Interfaces for TECH BLITZ 2K26

export type Department = 'auto_mech' | 'cse_aiml' | 'eee_ece' | 'civil' | 'mlt';
export type EventType = 'technical' | 'non_technical' | 'paper_presentation';

export interface Registration {
  name: string;
  college: string;
  department: Department;
  year: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventName: string;
  paymentScreenshot?: string; // Base64 encoded image
  paperFile?: string; // Cloudinary URL for PDF/Word file (for paper presentations)
  paperFileName?: string; // Original filename of the paper
  timestamp: Date;
}

export interface Event {
  id: string;
  name: string;
  department: Department;
  type: EventType;
  description?: string;
}

export interface Coordinator {
  id: string;
  name: string;
  role: 'staff' | 'student';
  phone: string;
  department: Department;
}

export interface DepartmentInfo {
  id: Department;
  name: string;
  staff: Coordinator[];
  students: Coordinator[];
}

// Department Names
export const DEPARTMENTS: Record<Department, string> = {
  auto_mech: 'AUTO / MECH',
  cse_aiml: 'CSE / AIML',
  eee_ece: 'EEE / ECE',
  civil: 'CIVIL',
  mlt: 'MLT'
};

// Firestore Collections (one per department)
export const FIRESTORE_COLLECTIONS: Record<Department, string> = {
  auto_mech: 'registrations_auto_mech',
  cse_aiml: 'registrations_cse_aiml',
  eee_ece: 'registrations_eee_ece',
  civil: 'registrations_civil',
  mlt: 'registrations_mlt'
};

// Non-Technical Collection
export const NON_TECHNICAL_COLLECTION = 'registrations_non_technical';
