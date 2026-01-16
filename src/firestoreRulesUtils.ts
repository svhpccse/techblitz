// Firestore Event Rules Management
import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc,
  query,
  where 
} from 'firebase/firestore';

export interface EventRule {
  id: string;
  eventName: string;
  title: string;
  rules: string[];
  department?: string;
  type?: 'technical' | 'non_technical' | 'paper_presentation';
  lastUpdated?: Date;
}

const RULES_COLLECTION = 'event_rules';

// Fetch all event rules from Firestore
export const getAllEventRulesFromFirestore = async (): Promise<Record<string, { title: string; rules: string[] }>> => {
  try {
    const querySnapshot = await getDocs(collection(db, RULES_COLLECTION));
    const rules: Record<string, { title: string; rules: string[] }> = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as EventRule;
      rules[data.eventName] = {
        title: data.title,
        rules: data.rules
      };
    });
    
    return rules;
  } catch (error) {
    console.error('Error fetching event rules from Firestore:', error);
    throw error;
  }
};

// Fetch a single event rule
export const getEventRuleFromFirestore = async (eventName: string): Promise<EventRule | null> => {
  try {
    const q = query(
      collection(db, RULES_COLLECTION),
      where('eventName', '==', eventName)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data() as EventRule;
  } catch (error) {
    console.error(`Error fetching rule for ${eventName}:`, error);
    throw error;
  }
};

// Save or update a single event rule
export const saveEventRuleToFirestore = async (rule: EventRule): Promise<void> => {
  try {
    const ruleDoc = doc(db, RULES_COLLECTION, rule.id);
    await setDoc(ruleDoc, {
      ...rule,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error saving event rule to Firestore:', error);
    throw error;
  }
};

// Update a specific event rule
export const updateEventRuleInFirestore = async (eventName: string, updates: Partial<EventRule>): Promise<void> => {
  try {
    const q = query(
      collection(db, RULES_COLLECTION),
      where('eventName', '==', eventName)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...updates,
        lastUpdated: new Date()
      });
    }
  } catch (error) {
    console.error(`Error updating rule for ${eventName}:`, error);
    throw error;
  }
};

// Push all hardcoded rules to Firestore (one-time migration)
export const pushHardcodedRulesToFirestore = async (hardcodedRules: Record<string, { title: string; rules: string[] }>): Promise<{ success: number; failed: number; errors: string[] }> => {
  const results = { success: 0, failed: 0, errors: [] as string[] };
  
  try {
    for (const [eventName, ruleData] of Object.entries(hardcodedRules)) {
      try {
        const rule: EventRule = {
          id: eventName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
          eventName,
          title: ruleData.title,
          rules: ruleData.rules,
          lastUpdated: new Date()
        };
        
        const ruleDoc = doc(db, RULES_COLLECTION, rule.id);
        await setDoc(ruleDoc, rule);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to save ${eventName}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  } catch (error) {
    console.error('Error during bulk push to Firestore:', error);
    throw error;
  }
  
  return results;
};

// Delete an event rule from Firestore
export const deleteEventRuleFromFirestore = async (eventName: string): Promise<void> => {
  try {
    const q = query(
      collection(db, RULES_COLLECTION),
      where('eventName', '==', eventName)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
    }
  } catch (error) {
    console.error(`Error deleting rule for ${eventName}:`, error);
    throw error;
  }
};

// Import deleteDoc
import { deleteDoc } from 'firebase/firestore';
