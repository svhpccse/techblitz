// Admin utilities for fetching registrations and exporting data
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { type Registration, FIRESTORE_COLLECTIONS, NON_TECHNICAL_COLLECTION } from './types';
import * as XLSX from 'xlsx';

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
    // Prepare data for Excel
    const data = registrations.map((reg) => ({
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
      'Registered On': reg.timestamp ? new Date(reg.timestamp).toLocaleString() : 'N/A'
    }));

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
      { wch: 20 }  // Registered On
    ];
    worksheet['!cols'] = columnWidths;

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `TECH_BLITZ_2K26_Registrations_${timestamp}.xlsx`;

    // Trigger download
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
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
