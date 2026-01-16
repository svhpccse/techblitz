// Firestore Event Data Management Utilities
import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Type definitions
export interface TechEvent {
  id: string;
  name: string;
  department: string;
  type: 'technical' | 'non_technical' | 'paper_presentation';
  description: string;
}

export interface PaperTopic {
  department: string;
  topics: string[];
}

export interface Coordinator {
  id: string;
  name: string;
  role: 'staff' | 'student';
  phone: string;
  department: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  staff: Coordinator[];
  students: Coordinator[];
}

export interface EventDetail {
  college: string;
  location: string;
  eventName: string;
  tagline: string;
  eventDate: string;
  registrationFee: string;
  registrationDeadline: string;
  intimationDate: string;
  prizeWorth: string;
  website: string;
  spotRegistration: boolean;
}

// Collection names
const EVENTS_COLLECTION = 'events';
const EVENT_DETAILS_COLLECTION = 'event_details';
const DEPARTMENTS_COLLECTION = 'departments_info';
const PAPER_TOPICS_COLLECTION = 'paper_topics';

// ============================================
// EVENTS MANAGEMENT
// ============================================

export const getAllEventsFromFirestore = async (): Promise<TechEvent[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, EVENTS_COLLECTION));
    const events: TechEvent[] = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data() as TechEvent);
    });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const saveEventToFirestore = async (event: TechEvent): Promise<void> => {
  try {
    await setDoc(doc(db, EVENTS_COLLECTION, event.id), event);
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

export const updateEventInFirestore = async (eventId: string, updates: Partial<TechEvent>): Promise<void> => {
  try {
    await updateDoc(doc(db, EVENTS_COLLECTION, eventId), updates);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEventFromFirestore = async (eventId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const pushEventsToFirestore = async (events: TechEvent[]): Promise<number> => {
  try {
    let count = 0;
    for (const event of events) {
      await saveEventToFirestore(event);
      count++;
    }
    return count;
  } catch (error) {
    console.error('Error pushing events:', error);
    throw error;
  }
};

// ============================================
// PAPER TOPICS MANAGEMENT
// ============================================

export const getAllPaperTopicsFromFirestore = async (): Promise<Record<string, string[]>> => {
  try {
    const querySnapshot = await getDocs(collection(db, PAPER_TOPICS_COLLECTION));
    const topics: Record<string, string[]> = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      topics[data.department] = data.topics;
    });
    return topics;
  } catch (error) {
    console.error('Error fetching paper topics:', error);
    throw error;
  }
};

export const savePaperTopicsToFirestore = async (department: string, topics: string[]): Promise<void> => {
  try {
    await setDoc(doc(db, PAPER_TOPICS_COLLECTION, department), {
      department,
      topics
    });
  } catch (error) {
    console.error('Error saving paper topics:', error);
    throw error;
  }
};

export const pushPaperTopicsToFirestore = async (paperTopics: Record<string, string[]>): Promise<number> => {
  try {
    let count = 0;
    for (const [dept, topics] of Object.entries(paperTopics)) {
      await savePaperTopicsToFirestore(dept, topics);
      count++;
    }
    return count;
  } catch (error) {
    console.error('Error pushing paper topics:', error);
    throw error;
  }
};

// ============================================
// DEPARTMENTS INFO MANAGEMENT
// ============================================

export const getAllDepartmentsFromFirestore = async (): Promise<DepartmentInfo[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, DEPARTMENTS_COLLECTION));
    const departments: DepartmentInfo[] = [];
    querySnapshot.forEach((doc) => {
      departments.push(doc.data() as DepartmentInfo);
    });
    return departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const saveDepartmentToFirestore = async (dept: DepartmentInfo): Promise<void> => {
  try {
    await setDoc(doc(db, DEPARTMENTS_COLLECTION, dept.id), dept);
  } catch (error) {
    console.error('Error saving department:', error);
    throw error;
  }
};

export const updateDepartmentInFirestore = async (deptId: string, updates: Partial<DepartmentInfo>): Promise<void> => {
  try {
    await updateDoc(doc(db, DEPARTMENTS_COLLECTION, deptId), updates);
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

export const pushDepartmentsToFirestore = async (departments: DepartmentInfo[]): Promise<number> => {
  try {
    let count = 0;
    for (const dept of departments) {
      await saveDepartmentToFirestore(dept);
      count++;
    }
    return count;
  } catch (error) {
    console.error('Error pushing departments:', error);
    throw error;
  }
};

// ============================================
// EVENT DETAILS MANAGEMENT
// ============================================

export const getEventDetailsFromFirestore = async (): Promise<EventDetail | null> => {
  try {
    const querySnapshot = await getDocs(collection(db, EVENT_DETAILS_COLLECTION));
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as EventDetail;
    }
    return null;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const saveEventDetailsToFirestore = async (details: EventDetail): Promise<void> => {
  try {
    await setDoc(doc(db, EVENT_DETAILS_COLLECTION, 'main'), details);
  } catch (error) {
    console.error('Error saving event details:', error);
    throw error;
  }
};

export const updateEventDetailsInFirestore = async (updates: Partial<EventDetail>): Promise<void> => {
  try {
    await updateDoc(doc(db, EVENT_DETAILS_COLLECTION, 'main'), updates);
  } catch (error) {
    console.error('Error updating event details:', error);
    throw error;
  }
};

// ============================================
// BULK MIGRATION
// ============================================

export const pushAllEventDataToFirestore = async (
  events: TechEvent[],
  paperTopics: Record<string, string[]>,
  departments: DepartmentInfo[],
  eventDetails: EventDetail
): Promise<{ events: number; topics: number; departments: number; details: boolean }> => {
  try {
    const eventCount = await pushEventsToFirestore(events);
    const topicCount = await pushPaperTopicsToFirestore(paperTopics);
    const deptCount = await pushDepartmentsToFirestore(departments);
    await saveEventDetailsToFirestore(eventDetails);

    return {
      events: eventCount,
      topics: topicCount,
      departments: deptCount,
      details: true
    };
  } catch (error) {
    console.error('Error pushing all event data:', error);
    throw error;
  }
};
