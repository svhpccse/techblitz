// Admin utilities for fetching registrations and exporting data
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { type Registration, FIRESTORE_COLLECTIONS, NON_TECHNICAL_COLLECTION } from './types';
import * as XLSX from 'xlsx';

// Helper function to format dates from Firestore timestamps
const formatDateForExport = (timestamp: any): string => {
  try {
    // If it's a Firestore Timestamp object with toDate method
    if (timestamp && typeof timestamp.toDate === 'function') {
      return new Date(timestamp.toDate()).toLocaleString('en-IN');
    }
    // If it's a regular Date object
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString('en-IN');
    }
    // If it's a string or number
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString('en-IN');
      }
    }
    return 'N/A';
  } catch (err) {
    console.error('Error formatting date:', err);
    return 'N/A';
  }
};

export const getAllRegistrations = async (): Promise<(Registration & { id: string })[]> => {
  try {
    const allRegistrations: (Registration & { id: string })[] = [];

    // Fetch from all department collections
    const departments = ['auto_mech', 'cse_aiml', 'eee_ece', 'civil', 'mlt'];
    
    for (const dept of departments) {
      const collectionName = FIRESTORE_COLLECTIONS[dept as keyof typeof FIRESTORE_COLLECTIONS];
      const registrationsRef = collection(db, collectionName);
      const querySnapshot = await getDocs(registrationsRef);
      
      querySnapshot.forEach((doc) => {
        allRegistrations.push({
          id: doc.id,
          ...(doc.data() as Registration)
        });
      });
    }

    // Fetch from non-technical collection
    const nonTechRef = collection(db, NON_TECHNICAL_COLLECTION);
    const nonTechSnapshot = await getDocs(nonTechRef);
    
    nonTechSnapshot.forEach((doc) => {
      allRegistrations.push({
        id: doc.id,
        ...(doc.data() as Registration)
      });
    });

    return allRegistrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
};

export const exportToExcel = (registrations: (Registration & { id: string })[]) => {
  try {
    console.log('=== EXCEL EXPORT START ===');
    console.log('Total registrations to export:', registrations.length);
    
    // Prepare data for Excel
    const data = registrations.map((reg) => {
      const paperFileValue = reg.eventType === 'paper_presentation' 
        ? (reg.paperFile ? reg.paperFile : 'Not Uploaded')
        : 'N/A';
      
      if (reg.eventType === 'paper_presentation') {
        console.log(`Paper Presentation - ${reg.name}:`, {
          paperFile: paperFileValue,
          paperFileName: reg.paperFileName || 'N/A'
        });
      }
      
      return {
        'ID': reg.id,
        'Name': reg.name,
        'College': reg.college,
        'Department': reg.department,
        'Year': reg.year,
        'Phone': reg.phone,
        'Email': reg.email,
        'Event Type': reg.eventType,
        'Event Name': reg.eventName,
        'Payment Screenshot': reg.paymentScreenshot || 'N/A',
        'Paper File': paperFileValue,
        'Paper File Name': reg.eventType === 'paper_presentation' ? (reg.paperFileName || 'N/A') : 'N/A',
        'Registered On': formatDateForExport(reg.timestamp)
      };
    });

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Set column widths
    const columnWidths = [
      { wch: 25 }, // ID
      { wch: 20 }, // Name
      { wch: 25 }, // College
      { wch: 15 }, // Department
      { wch: 8 },  // Year
      { wch: 15 }, // Phone
      { wch: 25 }, // Email
      { wch: 18 }, // Event Type
      { wch: 25 }, // Event Name
      { wch: 40 }, // Payment Screenshot
      { wch: 40 }, // Paper File
      { wch: 25 }, // Paper File Name
      { wch: 20 }  // Registered On
    ];
    worksheet['!cols'] = columnWidths;

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `TECH_BLITZ_2K26_Registrations_${timestamp}.xlsx`;

    // Trigger download
    XLSX.writeFile(workbook, filename);
    console.log('✅ Excel file exported successfully:', filename);
    console.log('=== EXCEL EXPORT END ===');
  } catch (error) {
    console.error('❌ Error exporting to Excel:', error);
    throw new Error('Failed to export to Excel');
  }
};

export const getRegistrationStats = (registrations: Registration[]) => {
  const stats = {
    total: registrations.length,
    byDepartment: {} as Record<string, number>,
    byEventType: {} as Record<string, number>,
    byYear: {} as Record<string, number>
  };

  registrations.forEach((reg) => {
    // By department
    stats.byDepartment[reg.department] = (stats.byDepartment[reg.department] || 0) + 1;
    
    // By event type
    stats.byEventType[reg.eventType] = (stats.byEventType[reg.eventType] || 0) + 1;
    
    // By year
    stats.byYear[reg.year] = (stats.byYear[reg.year] || 0) + 1;
  });

  return stats;
};
