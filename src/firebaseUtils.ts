// Firestore Utility Functions
// Handles all database operations for registrations

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Registration } from './types';
import { FIRESTORE_COLLECTIONS, NON_TECHNICAL_COLLECTION } from './types';

/**
 * Save registration to Firestore
 * Automatically routes to the correct collection based on department and event type
 *
 * @param registration - The registration data to save
 * @returns Promise with the document ID
 */
export const saveRegistration = async (registration: Omit<Registration, 'timestamp'>) => {
  try {
    // Determine which collection to use
    let collectionName = NON_TECHNICAL_COLLECTION;

    if (registration.eventType === 'paper_presentation' || registration.eventType === 'technical') {
      collectionName = FIRESTORE_COLLECTIONS[registration.department];
    }

    // Create the data object with server timestamp
    const dataToSave = {
      name: registration.name,
      college: registration.college,
      department: registration.department,
      year: registration.year,
      phone: registration.phone,
      email: registration.email,
      eventType: registration.eventType,
      eventName: registration.eventName,
      paymentScreenshot: registration.paymentScreenshot || null,
      timestamp: serverTimestamp()
    };

    // Add document to the collection
    const docRef = await addDoc(collection(db, collectionName), dataToSave);

    return {
      success: true,
      docId: docRef.id,
      message: 'Registration saved successfully!'
    };
  } catch (error: any) {
    console.error('Error saving registration:', error);

    return {
      success: false,
      message: `Error: ${error.message || 'Failed to save registration. Please try again.'}`
    };
  }
};

/**
 * Validate registration data before submission
 * Performs client-side validation
 *
 * @param registration - The registration data to validate
 * @returns Object with validation result and error messages
 */
export const validateRegistration = (registration: Omit<Registration, 'timestamp'>) => {
  const errors: string[] = [];

  // Validate name
  if (!registration.name || registration.name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  // Validate college
  if (!registration.college || registration.college.trim().length < 2) {
    errors.push('College name is required');
  }

  // Validate department
  if (!registration.department) {
    errors.push('Department selection is required');
  }

  // Validate year
  if (!registration.year) {
    errors.push('Year is required');
  }

  // Validate phone (10-13 digits)
  const phoneRegex = /^[0-9]{10,13}$/;
  if (!registration.phone || !phoneRegex.test(registration.phone.replace(/\D/g, ''))) {
    errors.push('Valid phone number is required (10-13 digits)');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!registration.email || !emailRegex.test(registration.email)) {
    errors.push('Valid email address is required');
  }

  // Validate event type
  if (!registration.eventType) {
    errors.push('Event type selection is required');
  }

  // Validate event name
  if (!registration.eventName) {
    errors.push('Event selection is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format phone number for display
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};
