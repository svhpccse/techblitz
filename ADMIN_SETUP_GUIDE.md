# Admin Panel Setup Guide

## Quick Start

### 1. Access the Admin Panel
```
Navigate to: http://localhost:5173/admin
```

### 2. Login
- **Password**: `tech@blitz2k26`
- Change this in `src/components/AdminAuth.tsx` if needed

### 3. Features Available

#### View All Registrations
- Table displays all registrations with complete details
- Auto-fetches from all department collections

#### Search & Filter
- **Search**: Enter name, email, phone, or event name
- **Department Filter**: Select specific department
- **Event Type Filter**: Choose technical, non-technical, or paper presentation

#### View Payment Proofs
- Click the eye icon (👁️) in Payment Proof column
- View uploaded payment screenshot
- Images stored in Cloudinary with secure URLs

#### Export to Excel
- Click "Export to Excel" button
- Downloads complete registration data as XLSX file
- Includes all columns and timestamps
- File saved as: `TECH_BLITZ_2K26_Registrations_YYYY-MM-DD.xlsx`

#### View Statistics
- **Total Registrations**: Overall count
- **Active Departments**: Departments with registrations
- **Total Fee**: Total collection (Registrations × ₹150)
- **Department Breakdown**: Registrations per department

## Architecture

### Files Created/Modified

**New Files:**
- `src/adminUtils.ts` - Data fetching and export utilities
- `src/components/Admin.tsx` - Main admin panel UI
- `src/components/Admin.css` - Admin panel styles
- `src/components/AdminAuth.tsx` - Authentication screen
- `src/components/AdminAuth.css` - Auth styles
- `src/components/AdminPage.tsx` - Protected wrapper

**Modified Files:**
- `src/main.tsx` - Added React Router
- `src/components/index.ts` - Exported new components
- `package.json` - Added dependencies (auto-handled)

### Dependencies Added
```json
{
  "react-router-dom": "^7.11.0",
  "xlsx": "^0.18.5"
}
```

## Data Flow

```
Admin Panel (/admin)
    ↓
AdminPage (checks authentication)
    ↓
AdminAuth (if not authenticated) → stores session
    ↓
Admin Component (loads data)
    ↓
adminUtils.getAllRegistrations()
    ↓
Firestore (all department collections)
    ↓
Display in Table with search/filter
```

## Firestore Collections Structure

The admin panel reads from:

```
Firestore Database
├── registrations_auto_mech
├── registrations_cse_aiml
├── registrations_eee_ece
├── registrations_civil
├── registrations_mlt
└── registrations_non_technical

Each collection contains Registration documents:
{
  name: string
  college: string
  department: string
  year: string
  phone: string
  email: string
  eventType: string
  eventName: string
  paymentScreenshot: string (Cloudinary URL)
  timestamp: date
}
```

## Customization

### Change Admin Password
File: `src/components/AdminAuth.tsx` (Line ~21)
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

### Add More Columns to Table
File: `src/components/Admin.tsx`
- Update table headers (line ~210)
- Update table data cells (line ~230)

### Modify Statistics
File: `src/adminUtils.ts`
- Extend `getRegistrationStats()` function
- Add new stat cards in Admin.tsx

### Change Export Filename Format
File: `src/adminUtils.ts` (line ~63)
```typescript
const filename = `YOUR_CUSTOM_NAME_${timestamp}.xlsx`;
```

## Security Notes

**Current Implementation:**
- Session-based authentication
- Password stored in frontend code
- Suitable for internal/local use

**For Production:**
- Implement backend authentication
- Use environment variables for password
- Add role-based access control
- Implement API rate limiting
- Add audit logging

## Troubleshooting

### 1. "Failed to fetch registrations"
- Check Firebase connection in console
- Verify `.env` file has correct credentials
- Check Firestore database rules allow read access

### 2. Excel export button disabled
- No registrations in database yet
- Wait for first registration to complete

### 3. Payment images not showing
- Verify Cloudinary integration
- Check `.env` file has correct Cloudinary settings
- Ensure payment screenshots were uploaded

### 4. Can't access admin panel
- Check URL: exactly `http://localhost:5173/admin`
- Verify React Router is working
- Check browser console for errors

## Performance Tips

- Search filters run client-side (very fast)
- Excel export done locally (no server needed)
- Initial load fetches all registrations once
- Suitable for events up to 5,000+ registrations

## Next Steps

1. **Test the panel**: Visit http://localhost:5173/admin
2. **Verify data loading**: Check registrations appear in table
3. **Test export**: Download a sample Excel file
4. **Change password**: Update ADMIN_PASSWORD to your preference
5. **Share access**: Give admin URL and password to authorized personnel

## Support

For issues or questions:
- Check console errors (F12 → Console)
- Review ADMIN_PANEL_DOCS.md for full documentation
- Check Firebase/Firestore connectivity
- Verify all files were created correctly
