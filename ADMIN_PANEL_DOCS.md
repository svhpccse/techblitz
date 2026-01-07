# Admin Panel Documentation - TECH BLITZ 2K26

## Overview
The admin panel provides a comprehensive interface to manage and view all event registrations. It includes features for searching, filtering, viewing payment proofs, and exporting data.

## Access

### URL
```
http://localhost:5173/admin
```

### Authentication
- **Default Password**: `tech@blitz2k26`
- Password is stored in `src/components/AdminAuth.tsx`
- Change the `ADMIN_PASSWORD` constant to set a custom password

### Security Features
- Session-based authentication (expires when browser closes)
- Maximum 3 login attempts before temporary lockout
- Password stored in frontend (for simplicity) - consider implementing backend authentication in production

## Features

### 1. **View All Registrations**
- View registrations from all departments
- Registrations displayed in a responsive table
- Shows: Name, Email, Phone, College, Department, Year, Event Type, Event Name, Payment Proof, Registration Date

### 2. **Search & Filter**
- **Search Bar**: Search by name, email, phone number, or event name
- **Department Filter**: Filter registrations by department
- **Event Type Filter**: Filter by Technical, Non-Technical, or Paper Presentation events
- Results update in real-time as you type/select

### 3. **Payment Proof Viewing**
- Click the eye icon to view payment screenshot uploaded by registrant
- Images are stored in Cloudinary and accessed via secure URLs
- Modal preview for detailed viewing

### 4. **Statistics Overview**
- **Total Registrations**: Count of all registrations
- **Active Departments**: Number of departments with registrations
- **Total Fee Collected**: Calculated as (Total Registrations × ₹150)
- **Detailed Department Breakdown**: Shows count per department

### 5. **Export to Excel**
- Click "Export to Excel" button to download all registration data
- Columns included:
  - ID
  - Name
  - College
  - Department
  - Year
  - Phone
  - Email
  - Event Type
  - Event Name
  - Payment Screenshot URL
  - Registration Date/Time
- File naming: `TECH_BLITZ_2K26_Registrations_YYYY-MM-DD.xlsx`

## Data Structure

### Firestore Collections Accessed
The admin panel retrieves data from:
- `registrations_auto_mech`
- `registrations_cse_aiml`
- `registrations_eee_ece`
- `registrations_civil`
- `registrations_mlt`
- `registrations_non_technical`

### Registration Document Structure
```typescript
{
  name: string;
  college: string;
  department: 'auto_mech' | 'cse_aiml' | 'eee_ece' | 'civil' | 'mlt';
  year: string;
  phone: string;
  email: string;
  eventType: 'technical' | 'non_technical' | 'paper_presentation';
  eventName: string;
  paymentScreenshot?: string; // Cloudinary URL
  timestamp: Date;
}
```

## File Structure

```
src/
├── components/
│   ├── Admin.tsx              # Main admin panel component
│   ├── Admin.css              # Admin panel styles
│   ├── AdminAuth.tsx          # Authentication component
│   ├── AdminAuth.css          # Auth styles
│   └── AdminPage.tsx          # Protected admin page wrapper
├── adminUtils.ts              # Admin utility functions
└── main.tsx                   # Router configuration
```

## Functions

### `adminUtils.ts`

#### `getAllRegistrations()`
- Fetches all registrations from all Firestore collections
- Returns: Array of registration objects with IDs
- Handles errors gracefully

#### `exportToExcel(registrations)`
- Converts registration data to Excel format
- Creates downloadable XLSX file
- Auto-generates filename with current date

#### `getRegistrationStats(registrations)`
- Calculates statistics from registrations
- Returns: Total count, counts by department, event type, and year

## Customization

### Change Admin Password
Edit `src/components/AdminAuth.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

### Change Authentication Method
Current: Session-based (frontend)
Recommended for production: Backend API with token-based auth

### Modify Table Columns
Edit `src/components/Admin.tsx` table headers and data mapping

### Add More Statistics
Extend `getRegistrationStats()` in `adminUtils.ts` with additional calculations

## Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Performance
- Loads all registrations on page load
- Search and filter operations performed client-side (fast)
- Excel export runs client-side (works offline)
- Suitable for events with up to 5,000+ registrations

## Known Limitations
1. Payment proof images can only be viewed (not deleted from Cloudinary)
2. No edit functionality for existing registrations
3. No bulk email capabilities
4. Authentication is session-based (consider upgrade for production)

## Troubleshooting

### Can't see registrations
- Check Firebase credentials in `.env`
- Verify Firestore collections exist with correct names
- Check browser console for errors

### Images not loading
- Verify Cloudinary URLs are valid
- Check internet connection
- Verify payment screenshots were uploaded to Cloudinary

### Excel export not working
- Check browser supports file downloads
- Clear browser cache
- Try different browser

## Future Enhancements
- [ ] Backend authentication
- [ ] Edit/delete registrations
- [ ] Bulk email to registrants
- [ ] Advanced analytics and charts
- [ ] QR code generation for check-in
- [ ] Payment verification status
- [ ] Event-wise registration reports
- [ ] Student duplicate checking
